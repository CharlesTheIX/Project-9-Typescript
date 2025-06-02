"use client";
import { useRouter } from "next/navigation";
import { useToastContext } from "./toastContext";
import { createContext, useContext, useState, useEffect, useRef } from "react";

type ImpersonationContextData = {
  user: User | null;
  stopImpersonating: (redirect?: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  impersonate: (user: User, redirect?: string | null) => void;
};

const defaultValue: ImpersonationContextData = {
  user: null,
  setUser: () => {},
  impersonate: () => {},
  stopImpersonating: () => {},
};
const ImpersonationContext = createContext<ImpersonationContextData>(defaultValue);

export const ImpersonationContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const router = useRouter();
  const toast = useToastContext();
  const loaded = useRef<number>(-1);
  const [user, setUser] = useState<User | null>(defaultValue.user);

  const stopImpersonating = (redirect: string | null = null): void => {
    setUser(null);
    if (!redirect) return;
    router.push(redirect);
  };

  const impersonate = (user: User, redirect: string | null = null): void => {
    setUser(user);
    if (!redirect) return;
    router.push(redirect);
  };

  const value: ImpersonationContextData = {
    user,
    setUser,
    impersonate,
    stopImpersonating,
  };

  useEffect(() => {
    loaded.current += 1;
    if (!loaded.current) return;

    if (!user) {
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle(`Impersonation Stopped.`);
      return;
    }

    toast.setType("success");
    toast.setContent("");
    toast.setHidden(false);
    toast.setTitle(`Impersonating ${user.username}.`);
  }, [user]);

  return <ImpersonationContext.Provider value={value}>{children}</ImpersonationContext.Provider>;
};

export const useImpersonationContext = () => {
  const context = useContext(ImpersonationContext);
  if (!context) throw new Error("useImpersonationContext must be used within a useImpersonationContextProvider.");
  return context;
};
