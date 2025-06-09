"use client";
import { useUser } from "@clerk/nextjs";
import { useToastContext } from "@/contexts/toastContext";
import getUserByClerkId from "@/lib/users/getUserByClerkId";
import { createContext, useContext, useState, useEffect } from "react";

type ToggleType = "sign-in" | "sign-out" | "none";
type UserContextData = {
  user: User | null;
  toggle: ToggleType;
  userRole: UserRole;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToggle: React.Dispatch<React.SetStateAction<ToggleType>>;
};

const defaultValue: UserContextData = {
  user: null,
  toggle: "none",
  userRole: "guest",
  setUser: () => {},
  setToggle: () => {},
};

const UserContext = createContext<UserContextData>(defaultValue);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { user } = useUser();
  const toast = useToastContext();
  const [dbUser, setDbUser] = useState<User | null>(defaultValue.user);
  const [toggle, setToggle] = useState<ToggleType>(defaultValue.toggle);
  const [userRole, setUserRole] = useState<UserRole>(defaultValue.userRole);

  const value: UserContextData = {
    toggle,
    userRole,
    setToggle,
    user: dbUser,
    setUser: setDbUser,
  };

  useEffect(() => {
    if (!user) {
      if (toggle === "sign-out") {
        toast.setType("bye");
        toast.setContent("");
        toast.setHidden(false);
        toast.setTitle(`Goodbye.`);
      }
      setDbUser(defaultValue.user);
      setUserRole(defaultValue.userRole);
      return;
    }

    (async () => {
      try {
        const response = await getUserByClerkId({ clerkId: user.id, options: {} });
        if (response.error) throw new Error(response.message);
        if (toggle === "sign-in") {
          toast.setType("hi");
          toast.setContent("");
          toast.setHidden(false);
          toast.setTitle(`Welcome back ${response.data.username}`);
        }
        setDbUser(response.data);
        setUserRole(response.data.role);
      } catch (error: any) {
        setDbUser(null);
      }
    })();
  }, [user, toggle]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within a UserContextProvider.");
  return context;
};
