"use client";
import { useThemeContext, ThemeType } from "@/contexts/themeContext";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <button
      type="button"
      className={`cursor-pointer p-4`}
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
      Theme {theme}
    </button>
  );
};

export default ThemeToggleButton;
