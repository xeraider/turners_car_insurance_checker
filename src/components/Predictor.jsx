import React from 'react';
import {useState} from 'react';

{/* Styles */}
import "../styles/Predictor.css";

{/* Images */}
import placeholder from "../assets/placeholder.png"

const Predictor = () => {

    const [image, setImage] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const [prediction, setPrediction] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = useState("");


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {return;}

        setImage(file);
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };


    const handlePredict = async () => {
        if (!image) return;

        setLoading(true);
        setError("");
        setPrediction(null);

        try {
            const response = await fetch("/api/predict", {
                method: "POST",
                headers: {"Content-Type": image.type},
                body: image
            });

            const data = await response.json();

            if (!response.ok) {throw new Error(data.error || "Prediction failed");}

            if (!data.predictions?.length) {throw new Error("No predictions returned");}

            const bestPrediction = data.predictions.reduce((best, current) =>
                    current.probability > best.probability ? current : best
            );

            setPrediction(bestPrediction);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="predictor">
            <h1>Car Insurance Estimator</h1>

            <div className="upload-container">

                <img src={preview || placeholder} alt="Uploaded car" className="car-preview"/>

                <input id="car-image" type="file" accept="image/jpeg,image/png" onChange={handleImageChange}/>

                <button className="predict-button" onClick={handlePredict} disabled={!image || loading}>
                    {loading ? "Predicting..." : "Predict Car Type"}
                </button>

            </div>


            {error && (
                <p className="error-message">{error}</p>
            )}

            {prediction && (
                <div className="prediction-result">
                    <h2>Prediction Result</h2>

                    <p>
                        <strong>Car Type:</strong> {prediction.tagName}
                    </p>

                    <p>
                        <strong>Confidence:</strong>{" "}
                        {(prediction.probability * 100).toFixed(2)}%
                    </p>

                    <h2>Insurance Premium</h2>
                    <p>
                        <strong>Confidence:</strong>{" "}
                        $$$
                    </p>
                </div>
            )}


        </section>
    )
}
export default Predictor
