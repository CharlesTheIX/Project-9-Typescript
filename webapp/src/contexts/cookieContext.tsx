"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCookieItem, setCookieItem, CookieType } from "@/functions/storage/browserCookies";

type CookieContextData = {
  cookie: CookieType | null;
  updateCookie: (value: boolean) => void;
  setCookie: React.Dispatch<React.SetStateAction<CookieType | null>>;
};

const defaultValue: CookieContextData = {
  cookie: null,
  setCookie: () => {},
  updateCookie: () => {},
};
const CookieContext = createContext<CookieContextData>(defaultValue);

export const CookieContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [cookie, setCookie] = useState<CookieType | null>(defaultValue.cookie);

  const updateCookie = (value: boolean) => {
    const newCookie: CookieType = { name: `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-cookie-acceptance`, value };
    setCookie(newCookie);
    setCookieItem(newCookie?.name as string, newCookie?.value);
  };

  const value: CookieContextData = { cookie, setCookie, updateCookie };

  useEffect(() => {
    const storedAcceptanceCookie = getCookieItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-cookie-acceptance`);
    if (storedAcceptanceCookie && !cookie) setCookie(storedAcceptanceCookie);
  }, []);
  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
};

export const useCookieContext = () => {
  const context = useContext(CookieContext);
  if (!context) throw new Error("useCookieContext must be used within a CookieContextProvider.");
  return context;
};
