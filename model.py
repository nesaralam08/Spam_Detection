import joblib
import re
import nltk
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords

nltk.download('stopwords')

# Load the trained model and vectorizer
model = joblib.load("spam_classifier_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Define preprocessing function
def preprocess_text(text):
    stemmer = PorterStemmer()
    stop_words = set(stopwords.words('english'))

    text = text.lower()
    text = re.sub(r'\W', ' ', text)  # Remove special characters
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    words = text.split()
    words = [stemmer.stem(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Prediction function
def predict_spam(email_text):
    processed_text = preprocess_text(email_text)
    text_vectorized = vectorizer.transform([processed_text]).toarray()
    prediction = model.predict(text_vectorized)
    return "Spam" if prediction[0] == 1 else "Not Spam"
