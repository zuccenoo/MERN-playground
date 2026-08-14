import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";

export default function AddExpenseDialog({
    open,
    onOpenChange,
    onSubmit,
    isSubmitting,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                        Create a new income or expense record.
                    </DialogDescription>
                </DialogHeader>

                <ExpenseForm
                    onSubmit={(values) => onSubmit(values)}
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
}
