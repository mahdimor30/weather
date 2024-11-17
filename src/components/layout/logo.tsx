import { Link } from "react-router-dom";

import { useTheme } from "@/context/theme-provider";

const Logo = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Link to={"/"}>
      <img
        src={isDark ? "/logo.png" : "/logo2.png"}
        alt="logo"
        className="h-14"
      />
    </Link>
  );
};

export default Logo;
