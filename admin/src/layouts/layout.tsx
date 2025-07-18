import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const Layout: React.FC = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside(
    [sidebarRef],
    () => {
      if (!isDesktopDevice && !collapsed) {
        setCollapsed(true);
      }
    },
    { dialogOpen }
  );

  return (
    <div className="min-h-screen bg-slate-100 relative z-0 transition-colors dark:bg-slate-900">
      <div
  className={cn(
    "pointer-events-none fixed inset-0 z-0 dark:bg-slate-900 opacity-0 transition-opacity",
    !collapsed &&
      "max-md:pointer-events-auto max-md:z-30 max-md:opacity-30"
  )}
/>

      <Sidebar ref={sidebarRef} collapsed={collapsed} />
      <div
        className={cn(
          "transition-[margin] duration-300",
          collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
        )}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="p-3 md:p-6 dark:bg-slate-900">
          <Outlet context={{ setDialogOpen }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
