"use client";
import Sun_SVG from "../SVGs/Sun_SVG";
import Moon_SVG from "../SVGs/Moon_SVG";
import { useThemeContext, ThemeType } from "@/contexts/themeContext";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <button
      id="theme-toggle"
      className={`${theme}`}
      onClick={() => {
        setTheme((prevValue: ThemeType) => {
          switch (prevValue) {
            case "dark":
              return "light";
            case "light":
              return "dark";
          }
        });
      }}
    >
      {theme === "dark" ? <Moon_SVG primaryColor="inherit" /> : <Sun_SVG primaryColor="inherit" />}
    </button>
  );
};

export default ThemeToggleButton;
