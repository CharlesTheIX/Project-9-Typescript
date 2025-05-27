"use client";
import Sun_SVG from "../SVGs/Sun_SVG";
import Moon_SVG from "../SVGs/Moon_SVG";
import Paintbrush_SVG from "../SVGs/Paintbrush_SVG";
import { useThemeContext, ThemeType } from "@/contexts/themeContext";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  const getThemeIcon = (theme: ThemeType): React.ReactNode => {
    switch (theme) {
      case "dark":
        return <Moon_SVG />;
      case "light":
        return <Sun_SVG />;
      case "custom":
        return <Paintbrush_SVG />;
    }
  };

  return (
    <button
      id="theme-toggle"
      className={`${theme} cursor-pointer appearance-none outline-none`}
      onClick={() => {
        setTheme((prevValue: ThemeType) => {
          switch (prevValue) {
            case "dark":
              return "light";
            case "light":
              return "custom";
            case "custom":
              return "dark";
          }
        });
      }}
    >
      {getThemeIcon(theme)}
    </button>
  );
};

export default ThemeToggleButton;
