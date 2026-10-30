
import express from "express";
import "dotenv/config";

const app = express();
const PORT = 3001;

app.use(express.raw({type: ["image/jpeg", "image/png"], limit: "4mb"}));

app.post("/api/predict", async (req, res) => {
    try {
        const image = req.body;

        if (!Buffer.isBuffer(image) || image.length === 0) {
            return res.status(400).json({error: "Please upload a valid image."});
        }

        const response = await fetch(process.env.AZURE_PREDICTION_URL,
            {method: "POST", headers: {
                    "Prediction-Key": process.env.AZURE_PREDICTION_KEY,
                    "Content-Type": req.headers["content-type"]
                },
                body: image
            }
        );

        if (!response.ok) {
            console.error("Azure prediction failed:", response.status);

            return res.status(502).json({error: "Azure could not process the image."});
        }

        const data = await response.json();

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({error: "Prediction failed."});
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running.");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

