import { Bell, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
    const { mode, base, setMode, setBase } = useTheme();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger />

                <h1 className="text-xl font-semibold">Expense Tracker</h1>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                        setMode(mode === "dark" ? "light" : "dark")
                    }
                >
                    {mode === "dark" ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </Button>

                <select
                    value={base}
                    onChange={(event) => setBase(event.target.value)}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="zinc">Zinc</option>
                    <option value="slate">Slate</option>
                    <option value="neutral">Neutral</option>
                    <option value="stone">Stone</option>
                    <option value="emerald">Emerald</option>
                </select>

                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    JD
                </div>
            </div>
        </header>
    );
}