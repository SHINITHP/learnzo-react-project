import { useEffect, useState, type FC } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import { useSearchParams } from "react-router-dom";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.trim()) {
        searchParams.set("search", input);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 300); // debounce to avoid too many URL updates

    return () => clearTimeout(delayDebounce);
  }, [input]);

  return (
    <header
      className={`fixed z-10 flex ${
        collapsed ? "w-[95%]" : "w-[84%]"
      }  h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900`}
    >
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </button>
        <div className="input flex items-center">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>
        <button className="btn-ghost size-10">
          <Bell size={20} />
        </button>
        <button className="size-10 overflow-hidden rounded-full">
          <img
            src={profileImg}
            alt="profile image"
            className="size-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
