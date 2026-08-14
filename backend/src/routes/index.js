import { Router } from "express";
import expenseRoutes from "../modules/expense/routes/expense.routes.js";

const router = Router();

router.use("/expenses", expenseRoutes);

export default router;