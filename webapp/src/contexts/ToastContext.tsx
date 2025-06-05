"use client";
import getSvg from "@/lib/getSvg";
import { useThemeContext } from "@/contexts/themeContext";
import { createContext, useContext, useState, useEffect, useRef } from "react";

type ToastType = "success" | "error" | "none" | "bye" | "hi";
type ToastContextData = {
  title: string;
  type: ToastType;
  hidden: boolean;
  content: string;
  timeout_ms: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<ToastType>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setTimeout_ms: React.Dispatch<React.SetStateAction<number>>;
};

const defaultValue: ToastContextData = {
  title: "",
  content: "",
  type: "none",
  hidden: true,
  timeout_ms: 5000,
  setType: () => {},
  setTitle: () => {},
  setHidden: () => {},
  setContent: () => {},
  setTimeout_ms: () => {}
};

const ToastContext = createContext<ToastContextData>(defaultValue);

export const ToastContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { theme } = useThemeContext();
  const toastRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState<boolean>(false);
  const [type, setType] = useState<ToastType>(defaultValue.type);
  const [title, setTitle] = useState<string>(defaultValue.title);
  const [hidden, setHidden] = useState<boolean>(defaultValue.hidden);
  const [content, setContent] = useState<string>(defaultValue.content);
  const [timeout_ms, setTimeout_ms] = useState<number>(defaultValue.timeout_ms);

  const value: ToastContextData = {
    type,
    title,
    hidden,
    content,
    setType,
    setTitle,
    setHidden,
    timeout_ms,
    setContent,
    setTimeout_ms
  };

  useEffect(() => {
    if (hidden) return;

    setHide(false);

    setTimeout(() => {
      if (!toastRef.current) return;
      setHide(true);
    }, timeout_ms - 100);

    setTimeout(() => {
      setHidden(true);
    }, timeout_ms);
  }, [hidden]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <>
        {!hidden && (
          <div
            ref={toastRef}
            id="toast-notification"
            className={`${
              hide ? "hide" : "show"
            } ${type} ${theme} bottom-10 py-2 px-5 gap-5 max-w-lg right-0 w-auto flex fixed overflow-hidden flex-col items-start`}
          >
            {type === "bye" ? (
              <div className="flex flex-row gap-5 items-center">
                {getSvg({ icon: "bye", size: 30 })}
                <p className="font-bold overflow-hidden">Goodbye.</p>
              </div>
            ) : (
              <div className="flex flex-row gap-5 items-center">
                {type === "success" && <>{getSvg({ icon: "success", size: 30 })}</>}
                {type === "error" && <>{getSvg({ icon: "error", size: 30 })}</>}
                {type === "hi" && <>{getSvg({ icon: "bye", size: 30 })}</>}

                <div>
                  {title && <p className="font-bold overflow-hidden">{title}</p>}
                  {content && <p className="text-xs overflow-hidden">{content}</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToastContext must be used within a ToastContextProvider.");
  return context;
};
