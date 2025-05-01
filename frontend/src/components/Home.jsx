import React, { useState } from 'react'
import axios from 'axios';
function Home() {
    const [loading, setLoading] = useState(false);
    const [emailText, setEmailText] = useState("");
    const [prediction, setPrediction] = useState("");
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post("https://spam-detection-backend.vercel.app/api/predict", {
                email: emailText,
            });
            setPrediction(response.data.prediction);
            setLoading(false)
        } catch (error) {
            console.error("Error predicting spam:", error);
            setPrediction("Error processing request");
            setLoading(false)
        }
    }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className='absolute top-20'>
                    <h1 className='text-3xl font-semibold opacity-20'>Spam Email Detection</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset w-[350px] lg:w-96 h-auto bg-base-100 border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend">Email</legend>
                        <textarea name="email" placeholder='Enter Email' className='textarea h-24 w-full outline-none' rows={10} value={emailText}
                            onChange={(e) => setEmailText(e.target.value)}>
                        </textarea>
                        <button className="btn btn-primary mt-5" type='submit'>
                            {
                                loading ? <span className="loading loading-spinner loading-md"></span> : "Predict"
                            }
                        </button>

                        {
                            prediction ? <p className='mt-5 text-lg font-semibold'>Email is : <span>{prediction}</span></p> : ""
                        }
                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default Home