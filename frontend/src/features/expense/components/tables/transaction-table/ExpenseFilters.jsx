import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExpenseFilters({
    searchQuery,
    typeFilter,
    categoryFilter,
    categories = [],
    sortBy,
    onSearchChange,
    onTypeChange,
    onCategoryChange,
    onSortChange,
}) {
    return (
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="grid gap-2">
                <Input
                    id="expense-search"
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Search title, category or notes"
                />
            </div>

            <div className="grid gap-2">
                <select
                    id="expense-type"
                    value={typeFilter}
                    onChange={(event) => onTypeChange(event.target.value)}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="all">All types</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

            <div className="grid gap-2">
                <select
                    id="expense-category"
                    value={categoryFilter}
                    onChange={(event) => onCategoryChange(event.target.value)}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="all">All categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2">
                <select
                    id="expense-sort"
                    value={sortBy}
                    onChange={(event) => onSortChange(event.target.value)}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="amount-desc">Amount: high → low</option>
                    <option value="amount-asc">Amount: low → high</option>
                </select>
            </div>
        </div>
    );
}
