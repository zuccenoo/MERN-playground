import {
    MdDashboard,
    MdReceiptLong,
    MdCategory,
    MdAssessment,
    MdSettings,
} from "react-icons/md";

export const navigation = [
    {
        name: "Dashboard",
        path: "/expense",
        icon: MdDashboard,
    },
    {
        name: "Transactions",
        path: "/expense/transactions",
        icon: MdReceiptLong,
    },
    {
        name: "Categories",
        path: "/expense/categories",
        icon: MdCategory,
    },
    {
        name: "Reports",
        path: "/expense/reports",
        icon: MdAssessment,
    },
    {
        name: "Settings",
        path: "/expense/settings",
        icon: MdSettings,
    },
];