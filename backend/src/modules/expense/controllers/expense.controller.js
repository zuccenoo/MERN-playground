import * as expenseService from "../services/expense.service.js";

import asyncHandler from "../../../utils/asyncHandler.js";
import ApiError from "../../../utils/ApiError.js";
import { sendResponse } from "../../../utils/response.js";

export const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await expenseService.getAllExpenses();

    sendResponse(
        res,
        200,
        true,
        "Expenses retrieved successfully",
        expenses
    );
});

export const getExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.getExpenseById(req.params.id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    sendResponse(
        res,
        200,
        true,
        "Expense retrieved successfully",
        expense
    );
});

export const createExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.createExpense(req.body);

    sendResponse(
        res,
        201,
        true,
        "Expense created successfully",
        expense
    );
});

export const updateExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.updateExpense(
        req.params.id,
        req.body
    );

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    sendResponse(
        res,
        200,
        true,
        "Expense updated successfully",
        expense
    );
});

export const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.deleteExpense(req.params.id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    sendResponse(
        res,
        200,
        true,
        "Expense deleted successfully"
    );
});