"use client";
import { useUser } from "@clerk/nextjs";
import { useToastContext } from "./toastContext";
import getUserByClerkId from "@/lib/users/getUserByClerkId";
import { createContext, useContext, useState, useEffect } from "react";

type ToggleType = "sign-in" | "sign-out" | "none";
type UserContextData = {
  user: User | null;
  toggle: ToggleType;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToggle: React.Dispatch<React.SetStateAction<ToggleType>>;
};

const defaultValue: UserContextData = {
  user: null,
  toggle: "none",
  setUser: () => {},
  setToggle: () => {},
};
const UserContext = createContext<UserContextData>(defaultValue);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { user } = useUser();
  const toast = useToastContext();
  const [username, setUsername] = useState<string>("");
  const [toggle, setToggle] = useState<ToggleType>(defaultValue.toggle);
  const [dbUser, setDbUser] = useState<User | null>(defaultValue.user);

  const value: UserContextData = {
    toggle,
    setToggle,
    user: dbUser,
    setUser: setDbUser,
  };

  useEffect(() => {
    if (!user) {
      if (toggle === "sign-out" || username) {
        toast.setHidden(false);
        toast.setType("success");
        toast.setTitle(`Goodbye ${username}`);
      }
      setDbUser(null);
      setUsername("");
      return;
    }

    (async () => {
      try {
        const response = await getUserByClerkId(user.id);
        if (response.error) throw new Error(response.message);
        if (toggle === "sign-in") {
          toast.setHidden(false);
          toast.setType("success");
          toast.setTitle(`Welcome back ${response.data.username}`);
        }
        setDbUser(response.data);
        setUsername(response.data.username);
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
