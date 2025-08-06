import { overviewData, recentSalesData, stats, topProducts } from "@/constants";

import { Footer } from "@/layouts/footer";

import PageMeta from "@/components/common/PageMeta";
import StatCard from "@/components/stat-card";
import OverviewChart from "@/components/overview-chart";
import RecentSalesCard from "@/components/recent-sales";
import TopProductsTable from "@/components/top-products-table";
import { useSelector } from "react-redux";
import type { RootState } from "@/types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/sign-in");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <PageMeta
        title="LearnEase Admin Panel"
        description="LearnEase admin dashboard page"
      />

      <div className="flex flex-col gap-y-4">
        <h1 className="title">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              Icon={stat.icon}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              trendType={stat.trendType}
            />
          ))}
        </div>

        {/* Chart + Recent Sales */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* overview-chart */}
          <OverviewChart data={overviewData} />

          <RecentSalesCard data={recentSalesData} />
        </div>

        {/* Top Orders Table */}
        <div className="card">
          <div className="card-header">
            <p className="card-title">Top Orders</p>
          </div>

          {/* top-products-table */}
          <TopProductsTable products={topProducts} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
