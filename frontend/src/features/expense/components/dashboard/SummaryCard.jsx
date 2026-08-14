import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({
    title,
    value,
    subtitle,
    icon: Icon,
}) {
    return (
        <Card className="transition-shadow hover:shadow-lg">

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                {Icon && (
                    <Icon className="h-5 w-5 text-muted-foreground" />
                )}

            </CardHeader>

            <CardContent>

                <div className="text-3xl font-bold">

                    {value}

                </div>

                {subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">

                        {subtitle}

                    </p>
                )}

            </CardContent>

        </Card>
    );
}