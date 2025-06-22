import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import type { OverviewChartProps } from "@/types";



const OverviewChart = ({ data }: OverviewChartProps) => {
  const { theme } = useTheme();

  return (
    <div className="card col-span-1 md:col-span-2 lg:col-span-4">
      <div className="card-header">
        <p className="card-title">Overview</p>
      </div>
      <div className="card-body p-0">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip cursor={false} formatter={(value) => `$${value}`} />
            <XAxis
              dataKey="name"
              strokeWidth={0}
              stroke={theme === "light" ? "#475569" : "#94a3b8"}
              tickMargin={6}
            />
            <YAxis
              dataKey="total"
              strokeWidth={0}
              stroke={theme === "light" ? "#475569" : "#94a3b8"}
              tickFormatter={(value) => `$${value}`}
              tickMargin={6}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
