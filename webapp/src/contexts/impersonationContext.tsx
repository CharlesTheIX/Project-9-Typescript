"use client";
import { useRouter } from "next/navigation";
import getUserById from "@/lib/users/getUserById";
import { useToastContext } from "@/contexts/toastContext";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import ImpersonationRestrictedBanner from "@/components/Banners/ImpersonationRestrictedBanner";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "@/lib/storage/localStorage";

type ImpersonationContextData = {
  user: User | null;
  stopImpersonating: (redirect?: string | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  impersonate: (user: User, redirect?: string | null) => void;
  setAcceptedRoles: React.Dispatch<React.SetStateAction<UserRole[]>>;
};

const impersonation_storage_token = `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}_IMPERSONATION`;
const defaultValue: ImpersonationContextData = {
  user: null,
  setUser: () => {},
  impersonate: () => {},
  setAcceptedRoles: () => {},
  stopImpersonating: () => {},
};

const ImpersonationContext = createContext<ImpersonationContextData>(defaultValue);

export const ImpersonationContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const router = useRouter();
  const toast = useToastContext();
  const loaded = useRef<number>(-1);
  const [user, setUser] = useState<User | null>(defaultValue.user);
  const [acceptedRoles, setAcceptedRoles] = useState<UserRole[]>([]);

  const stopImpersonating = (redirect: string | null = null): void => {
    setUser(null);
    removeLocalStorageItem(impersonation_storage_token);
    if (!redirect) return;
    router.push(redirect);
  };

  const impersonate = (user: User, redirect: string | null = null): void => {
    setUser(user);
    setLocalStorageItem(impersonation_storage_token, user._id);
    if (!redirect) return;
    router.push(redirect);
  };

  const value: ImpersonationContextData = {
    user,
    setUser,
    impersonate,
    setAcceptedRoles,
    stopImpersonating,
  };

  useEffect(() => {
    loaded.current += 1;
    if (!loaded.current) return;

    if (getLocalStorageItem(impersonation_storage_token)) {
      try {
        (async () => {
          try {
            const response = await getUserById(getLocalStorageItem(impersonation_storage_token));
            if (response.error) throw new Error(response.message);
            setUser(response.data);
          } catch (error: any) {
            removeLocalStorageItem(impersonation_storage_token);
            return;
          }
        })();
      } catch (error: any) {
        removeLocalStorageItem(impersonation_storage_token);
        return;
      }
    }

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

  return (
    <ImpersonationContext.Provider value={value}>
      {children}
      {acceptedRoles.length > 0 && user && !acceptedRoles.includes(user.role) && (
        <ImpersonationRestrictedBanner acceptedRoles={acceptedRoles} />
      )}
    </ImpersonationContext.Provider>
  );
};

export const useImpersonationContext = () => {
  const context = useContext(ImpersonationContext);
  if (!context) throw new Error("useImpersonationContext must be used within a useImpersonationContextProvider.");
  return context;
};
