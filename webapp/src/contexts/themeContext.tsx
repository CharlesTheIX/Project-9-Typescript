"use client";
import * as LS from "@/lib/storage/localStorage";
import { createContext, useContext, useState, useEffect, useRef } from "react";

export type ThemeType = "light" | "dark" | "custom";
type ThemeContextData = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

const defaultValue: ThemeContextData = {
  theme: "dark",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextData>(defaultValue);

export const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const hasInit = useRef<boolean>(false);
  const [theme, setTheme] = useState<ThemeType>(defaultValue.theme);

  const value: ThemeContextData = { theme, setTheme };

  useEffect(() => {
    if (!hasInit.current) {
      const storedTheme = LS.getLocalStorageItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-theme`);
      if (storedTheme) setTheme(storedTheme.value as ThemeType);
    }
    hasInit.current = true;
    LS.setLocalStorageItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-theme`, { value: theme });
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within a ThemeContextProvider.");
  return context;
};
