import api from "../../../shared/api/axios";
import { ENDPOINTS } from "../../../shared/api/endpoints";

export const getTransactions = async () => {
    const response = await api.get(ENDPOINTS.expenses);
    return response.data.data;
};

export const createTransaction = async (transaction) => {
    const response = await api.post(ENDPOINTS.expenses, transaction);
    return response.data.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await api.put(`${ENDPOINTS.expenses}/${id}`, transaction);
  return response.data.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`${ENDPOINTS.expenses}/${id}`);
  return response.data.data;
};