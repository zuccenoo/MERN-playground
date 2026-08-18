import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

//rate limiter
const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { success: false, message: "Too many posts — try again later." },
});

app.use("/api/thoughts", postLimiter);
app.use("/api/expenses", postLimiter);

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