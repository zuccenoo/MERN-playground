import { Router } from "express";
import expenseRoutes from "../modules/expense/routes/expense.routes.js";
import thoughtRoutes from "../modules/thought/routes/thought.routes.js";

const router = Router();

router.use("/expenses", expenseRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;