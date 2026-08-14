import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const expenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.coerce.number().positive("Amount must be positive"),
    category: z.string().min(1, "Category is required"),
    type: z.enum(["income", "expense"]),
    date: z.string().min(1, "Date is required"),
    notes: z.string().optional(),
});

export default function ExpenseForm({
    initialValues,
    onSubmit,
    submitLabel = "Save transaction",
    isSubmitting = false,
}) {
    const form = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: initialValues?.title ?? "",
            amount: initialValues?.amount ?? 0,
            category: initialValues?.category ?? "",
            type: initialValues?.type ?? "expense",
            date: initialValues?.date ?? new Date().toISOString().slice(0, 10),
            notes: initialValues?.notes ?? "",
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="expense-form-title">Title</Label>
                <Input id="expense-form-title" {...form.register("title")} />
                {form.formState.errors.title && (
                    <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expense-form-amount">Amount</Label>
                <Input id="expense-form-amount" type="number" step="0.01" {...form.register("amount")} />
                {form.formState.errors.amount && (
                    <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expense-form-category">Category</Label>
                <Input id="expense-form-category" {...form.register("category")} />
                {form.formState.errors.category && (
                    <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expense-form-type">Type</Label>
                <Select
                    onValueChange={(value) => form.setValue("type", value)}
                    defaultValue={form.getValues("type")}
                >
                    <SelectTrigger id="expense-form-type">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                </Select>
                {form.formState.errors.type && (
                    <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expense-form-date">Date</Label>
                <Input id="expense-form-date" type="date" {...form.register("date")} />
                {form.formState.errors.date && (
                    <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expense-form-notes">Notes</Label>
                <Textarea id="expense-form-notes" {...form.register("notes")} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : submitLabel}
            </Button>
        </form>
    );
}
