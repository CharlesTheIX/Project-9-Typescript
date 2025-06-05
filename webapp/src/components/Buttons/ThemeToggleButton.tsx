"use client";
import Sun_SVG from "@/SVGs/Sun_SVG";
import Moon_SVG from "@/SVGs/Moon_SVG";
import Paintbrush_SVG from "@/SVGs/Paintbrush_SVG";
import { useThemeContext, ThemeType } from "@/contexts/themeContext";

type Props = {
  className?: string;
};

const ThemeToggleButton: React.FC<Props> = (props: Props) => {
  const { className = "" } = props;
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
      className={`${className} outline-none cursor-pointer appearance-none`}
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
