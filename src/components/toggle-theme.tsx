import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
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
  );
};

export default ToggleTheme;
