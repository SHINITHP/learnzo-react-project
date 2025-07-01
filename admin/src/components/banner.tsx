import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Define variants using cva
const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full", // fixed typo: 'item-center' → 'items-center'
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/60 border-yellow-300 text-yellow-900",
        success: "bg-emerald-100 border-emerald-400 text-emerald-800",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

// Define props for the Banner
interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
  className?: string;
}

// Map icons to variants
const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

// Banner component
export const Banner = ({ label, variant, className }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      <Icon className="h-4 w-4 mr-2 shrink-0" />
      <span>{label}</span>
    </div>
  );
};
