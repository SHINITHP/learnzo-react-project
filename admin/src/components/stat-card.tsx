import type { IStatProps } from "@/types";
import { TrendingDown, TrendingUp } from "lucide-react";

const StatCard = ({ Icon , title, value, trend, trendType }: IStatProps) => {
  return (
    <div className="card rounded-2xl">
      <div className="card-header">
        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
          <Icon fontSize={26}/>
        </div>
        <p className="card-title">{title}</p>
      </div>
      <div className="flex justify-between gap-y-2 rounded-lg p-2 dark:bg-slate-900">
        <p className="w-fit text-2xl font-bold text-slate-900 dark:text-slate-50">
          {value}
        </p>
        <span className={`flex pl-4 pr-4 h-7 text-sm items-center gap-x-2 rounded-full ${trendType === 'up' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}  font-medium `}>
          {trendType === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {trend}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;
