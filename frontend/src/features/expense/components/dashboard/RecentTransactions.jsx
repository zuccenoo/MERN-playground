import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentTransactions({ expenses }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">
                                Amount
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell className="font-medium">
                                    {expense.title}
                                </TableCell>

                                <TableCell>
                                    {expense.category}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            expense.type === "income"
                                                ? "default"
                                                : "destructive"
                                        }
                                    >
                                        {expense.type}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right font-semibold">
                                    ₱{expense.amount.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}