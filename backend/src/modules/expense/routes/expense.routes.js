import { Router } from "express";

import {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
} from "../controllers/expense.controller.js";

import validate from "../../../middleware/validate.js";

import {
    createExpenseSchema,
} from "../validations/expense.validation.js";

import validateObjectId from "../../../middleware/validateObjectId.js";

const router = Router();

router.get("/", getExpenses);

router.get("/:id", validateObjectId, getExpense);

router.post(
    "/",
    validate(createExpenseSchema),
    createExpense
);

router.put(
    "/:id",
    validateObjectId,
    validate(createExpenseSchema),
    updateExpense
);

router.delete("/:id", validateObjectId, deleteExpense);

export default router;