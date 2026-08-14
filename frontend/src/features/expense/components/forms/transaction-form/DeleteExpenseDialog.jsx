import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteExpenseDialog({
    open,
    onOpenChange,
    expense,
    onConfirm,
    isDeleting,
}) {
    if (!expense) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete transaction</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{expense.title}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onConfirm(expense._id)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
