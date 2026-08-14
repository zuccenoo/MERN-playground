import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTransactions } from "../hooks/useTransactions";
import ExpenseTable from "../components/tables/transaction-table/ExpenseTable";
import ExpenseFilters from "../components/tables/transaction-table/ExpenseFilters";
import AddExpenseDialog from "../components/forms/transaction-form/AddExpenseDialog";
import EditExpenseDialog from "../components/forms/transaction-form/EditExpenseDialog";
import DeleteExpenseDialog from "../components/forms/transaction-form/DeleteExpenseDialog";
import {
    useCreateTransaction,
    useUpdateTransaction,
    useDeleteTransaction,
} from "../hooks/useTransactionMutations";

export default function Transactions() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [activeTransaction, setActiveTransaction] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const { data: transactions } = useTransactions();

    const categories = useMemo(() => {
        if (!transactions) return [];
        return Array.from(
            new Set(transactions.map((transaction) => transaction.category).filter(Boolean))
        ).sort();
    }, [transactions]);

    const createTransaction = useCreateTransaction();
    const updateTransaction = useUpdateTransaction();
    const deleteTransaction = useDeleteTransaction();

    const handleCreate = (values) => {
        createTransaction.mutate(values, {
            onSuccess: () => setIsCreateOpen(false),
        });
    };

    const handleUpdate = (id, values) => {
        updateTransaction.mutate(
            { id, data: values },
            {
                onSuccess: () => setIsEditOpen(false),
            }
        );
    };

    const handleDelete = (id) => {
        deleteTransaction.mutate(id, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                setActiveTransaction(null);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Transactions</h1>
                    <p className="text-muted-foreground">
                        Manage your income and expense transactions.
                    </p>
                </div>

                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                </Button>
            </div>

            <ExpenseFilters
                searchQuery={searchQuery}
                typeFilter={typeFilter}
                categoryFilter={categoryFilter}
                categories={categories}
                sortBy={sortBy}
                onSearchChange={setSearchQuery}
                onTypeChange={setTypeFilter}
                onCategoryChange={setCategoryFilter}
                onSortChange={setSortBy}
            />

            <ExpenseTable
                searchQuery={searchQuery}
                typeFilter={typeFilter}
                categoryFilter={categoryFilter}
                sortBy={sortBy}
                onEdit={(transaction) => {
                    setActiveTransaction(transaction);
                    setIsEditOpen(true);
                }}
                onDelete={(transaction) => {
                    setActiveTransaction(transaction);
                    setIsDeleteOpen(true);
                }}
            />

            <AddExpenseDialog
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
                onSubmit={handleCreate}
                isSubmitting={createTransaction.isLoading}
            />

            <EditExpenseDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                expense={activeTransaction}
                onSubmit={handleUpdate}
                isSubmitting={updateTransaction.isLoading}
            />

            <DeleteExpenseDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                expense={activeTransaction}
                onConfirm={handleDelete}
                isDeleting={deleteTransaction.isLoading}
            />
        </div>
    );
}