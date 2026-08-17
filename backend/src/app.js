import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Expense Tracker API is running",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use(errorHandler);

export default app;