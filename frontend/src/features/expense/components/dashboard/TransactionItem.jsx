import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", expense: 1200 },
  { month: "Feb", expense: 1800 },
  { month: "Mar", expense: 1500 },
  { month: "Apr", expense: 2100 },
  { month: "May", expense: 1700 },
  { month: "Jun", expense: 2400 },
];

export default function MonthlyChart() {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h2 className="card-title">Monthly Spending</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#16a34a"
                fill="#22c55e"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}