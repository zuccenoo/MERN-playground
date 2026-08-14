import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const expenseRoutes = [
    {
        index: true,
        element: <Dashboard />,
    },
    {
        path: "transactions",
        element: <Transactions />,
    },
    {
        path: "categories",
        element: <Categories />,
    },
    {
        path: "reports",
        element: <Reports />,
    },
    {
        path: "settings",
        element: <Settings />,
    },
];

export default expenseRoutes;