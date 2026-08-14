import Expense from "../models/expense.model.js";

export const getAllExpenses = async () => {
    return await Expense.find().sort({ date: -1 });
};

export const getExpenseById = async (id) => {
    return await Expense.findById(id);
};

export const createExpense = async (expenseData) => {
    return await Expense.create(expenseData);
};

export const updateExpense = async (id, expenseData) => {
    return await Expense.findByIdAndUpdate(
        id,
        expenseData,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteExpense = async (id) => {
    return await Expense.findByIdAndDelete(id);
};