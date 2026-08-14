import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../services/transaction.service";

const invalidateTransactions = (queryClient) =>
    queryClient.invalidateQueries({ queryKey: ["transactions"] });

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            invalidateTransactions(queryClient);
            toast.success("Transaction added");
        },
        onError: () => {
            toast.error("Could not add transaction");
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateTransaction(id, data),
        onSuccess: () => {
            invalidateTransactions(queryClient);
            toast.success("Transaction updated");
        },
        onError: () => {
            toast.error("Could not update transaction");
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            invalidateTransactions(queryClient);
            toast.success("Transaction deleted");
        },
        onError: () => {
            toast.error("Could not delete transaction");
        },
    });
}