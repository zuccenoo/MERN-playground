import { Badge } from "@/components/ui/badge";

import ExpenseActions from "./ExpenseActions";

function formatDate(value) {
    if (!value) return "—";

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "—";

    return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function ExpenseRow({ expense, onEdit, onDelete }) {
    const { title, category, type, amount, date } = expense;

    return (
        <tr className="border-b ">
            <td className="px-4 py-3 text-sm font-medium">{title}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{category}</td>
            <td className="px-4 py-3 text-sm">
                <Badge variant={type === "income" ? "secondary" : "destructive"}>
                    {type}
                </Badge>
            </td>
            <td className="px-4 py-3 text-sm">₱{Number(amount).toLocaleString()}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
                {formatDate(date)}
            </td>
            <td className="px-4 py-3">
                <ExpenseActions onEdit={onEdit} onDelete={onDelete} />
            </td>
        </tr>
    );
}
