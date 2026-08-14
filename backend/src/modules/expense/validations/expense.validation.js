import { z } from "zod";

export const createExpenseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required"),

    amount: z
        .number()
        .positive("Amount must be greater than zero"),

    type: z.enum([
        "income",
        "expense",
    ]),

    category: z
        .string()
        .trim()
        .min(1, "Category is required"),

    notes: z.string().optional(),
});