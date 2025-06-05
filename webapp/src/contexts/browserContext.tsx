"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCookieItem, setCookieItem, CookieType } from "@/lib/storage/browserCookies";

type Browser = "safari" | "chrome" | "fireFox";
type BrowserContextData = {
  browser: Browser | null;
  cookie: CookieType | null;
  updateCookie: (value: boolean) => void;
  setCookie: React.Dispatch<React.SetStateAction<CookieType | null>>;
};

const defaultValue: BrowserContextData = {
  cookie: null,
  browser: null,
  setCookie: () => {},
  updateCookie: () => {},
};

const BrowserContext = createContext<BrowserContextData>(defaultValue);

export const BrowserContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [browser, setBrowser] = useState<Browser | null>(defaultValue.browser);
  const [cookie, setCookie] = useState<CookieType | null>(defaultValue.cookie);

  const updateCookie = (value: boolean) => {
    const newCookie: CookieType = { name: `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-cookie-acceptance`, value };
    setCookie(newCookie);
    setCookieItem(newCookie?.name as string, newCookie?.value);
  };

  const value: BrowserContextData = { cookie, setCookie, updateCookie, browser };

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const storedAcceptanceCookie = getCookieItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-cookie-acceptance`);
    if (storedAcceptanceCookie && !cookie) setCookie(storedAcceptanceCookie);
    if (userAgent.includes("Chrome")) setBrowser("chrome");
    if (userAgent.includes("Firefox")) setBrowser("fireFox");
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) setBrowser("safari");
  }, []);

  return <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>;
};

export const useBrowserContext = () => {
  const context = useContext(BrowserContext);
  if (!context) throw new Error("useBrowserContext must be used within a BrowserContextProvider.");
  return context;
};
