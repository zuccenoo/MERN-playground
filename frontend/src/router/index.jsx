import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/ExpenseLayout";
import expenseRoutes from "../features/expense/routes";
import Playground from "../features/playground/pages/Playground";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Playground />,
    },
    {
        path: "/expense",
        element: <DashboardLayout />,
        children: expenseRoutes,
    },
]);

export default router;