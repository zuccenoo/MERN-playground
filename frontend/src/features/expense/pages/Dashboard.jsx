import { useTransactions } from "../hooks/useTransactions";

import SummaryGrid from "../components/dashboard/SummaryGrid";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function Dashboard() {
    const { data, isLoading, error } = useTransactions();

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>Error loading transactions.</h1>;

    return (
        <div className="space-y-6">
            <SummaryGrid expenses={data} />

            <RecentTransactions expenses={data} />
        </div>
    );
}