import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur
        supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="logo"
            className="h-14"
          />
        </Link>
        <div>
          <button
            className={cn(
              "flex items-center transition-transform duration-500",
              isDark ? "rotate-180" : "rotate-0",
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? (
              <Sun className="size-7 rotate-0 text-yellow-500 transition-all" />
            ) : (
              <Moon className="size-7 rotate-0 text-blue-500 transition-all" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
