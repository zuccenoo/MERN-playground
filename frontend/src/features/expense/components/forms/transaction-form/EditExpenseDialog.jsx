import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";

export default function EditExpenseDialog({
    open,
    onOpenChange,
    expense,
    onSubmit,
    isSubmitting,
}) {
    if (!expense) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogDescription>
                        Update the selected transaction record.
                    </DialogDescription>
                </DialogHeader>

                <ExpenseForm
                    initialValues={{
                        title: expense.title ?? "",
                        amount: expense.amount ?? 0,
                        category: expense.category ?? "",
                        type: expense.type ?? "expense",
                        date: expense.date ? new Date(expense.date).toISOString().slice(0, 10) : "",
                        notes: expense.notes ?? "",
                    }}
                    onSubmit={(values) => onSubmit(expense._id, values)}
                    submitLabel="Save changes"
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
