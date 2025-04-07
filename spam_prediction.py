from model import predict_spam,preprocess_text
from flask import *
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/api/predict',methods=["POST"])
def predict():
    data = request.get_json()
    email = data.get("email","")
    if not email:
        return jsonify({"error": "No email text provided"}), 400
    
    result = predict_spam(email)
    
    return jsonify({"prediction": result})

if __name__=="__main__":
    app.run(debug=True)