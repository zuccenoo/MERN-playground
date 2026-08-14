import SummaryCard from "./SummaryCard";

export default function SummaryGrid({ expenses }) {
    const income = expenses
        .filter((expense) => expense.type === "income")
        .reduce((sum, expense) => sum + expense.amount, 0);

    const expenseTotal = expenses
        .filter((expense) => expense.type === "expense")
        .reduce((sum, expense) => sum + expense.amount, 0);

    const balance = income - expenseTotal;

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Balance"
                value={`₱${balance.toLocaleString()}`}
            />

            <SummaryCard
                title="Income"
                value={`₱${income.toLocaleString()}`}
            />

            <SummaryCard
                title="Expenses"
                value={`₱${expenseTotal.toLocaleString()}`}
            />

            <SummaryCard
                title="Transactions"
                value={expenses.length}
            />
        </div>
    );
}