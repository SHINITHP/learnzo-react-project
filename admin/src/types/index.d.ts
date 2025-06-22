export interface IStatProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  trend?: number;
  trendType?: "up" | "down";
}

export interface OverviewChartProps {
  data: { name: string; total: number }[];
}

export interface Sale {
  id: string | number;
  name: string;
  email: string;
  image: string;
  total: number;
}

export interface RecentSalesCardProps {
  data: Sale[];
}

export interface Product {
  number: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
  description: string;
}

export interface TopProductsTableProps {
  products: Product[];
}