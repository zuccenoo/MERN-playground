import { useMemo } from "react";
import { useTransactions } from "../../../hooks/useTransactions";
import ExpenseRow from "./ExpenseRow";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export default function ExpenseTable({
    searchQuery,
    typeFilter,
    categoryFilter,
    sortBy,
    onEdit,
    onDelete,
}) {
    const { data: transactions, isLoading, error } = useTransactions();

    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];

        const normalizedSearch = searchQuery.trim().toLowerCase();

        return [...transactions]
            .filter((transaction) => {
                const matchesType =
                    typeFilter === "all" || transaction.type === typeFilter;
                const matchesCategory =
                    categoryFilter === "all" || transaction.category === categoryFilter;
                const matchesSearch =
                    normalizedSearch.length === 0 ||
                    [transaction.title, transaction.category, transaction.notes]
                        .filter(Boolean)
                        .some((value) =>
                            value.toLowerCase().includes(normalizedSearch)
                        );

                return matchesType && matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === "newest") {
                    return new Date(b.date) - new Date(a.date);
                }

                if (sortBy === "oldest") {
                    return new Date(a.date) - new Date(b.date);
                }

                if (sortBy === "amount-asc") {
                    return (a.amount ?? 0) - (b.amount ?? 0);
                }

                if (sortBy === "amount-desc") {
                    return (b.amount ?? 0) - (a.amount ?? 0);
                }

                return 0;
            });
    }, [transactions, searchQuery, typeFilter, categoryFilter, sortBy]);

    if (isLoading) return <p>Loading transactions...</p>;
    if (error) return <p>Error loading transactions.</p>;

    return (
        <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <CardTitle>Transactions</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {filteredTransactions.length} item
                    {filteredTransactions.length === 1 ? "" : "s"}
                </p>
            </CardHeader>

            <CardContent className="p-0">
                {filteredTransactions.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <ExpenseRow
                                    key={transaction._id}
                                    expense={transaction}
                                    onEdit={() => onEdit(transaction)}
                                    onDelete={() => onDelete(transaction)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="p-6 text-sm text-muted-foreground">
                        No transactions match your filters.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
