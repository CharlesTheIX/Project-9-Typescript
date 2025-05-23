"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

type ToastType = "success" | "error" | "none";
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
  title: "TESTING",
  content: "",
  type: "success",
  hidden: false,
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
  const toastRef = useRef<HTMLDivElement>(null);
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

    setTimeout(() => {
      if (!toastRef.current) return;
      toastRef.current.classList.add('fade-out');
    }, timeout_ms - 500);

    setTimeout(() => {
      setHidden(true);
    }, timeout_ms);
  }, [hidden]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <>
        {!hidden && (
          <div ref={toastRef} id="toast-notification" className={`${type}`}>
            <div>
              {title && <h5>{title}</h5>}
              {content && <p dangerouslySetInnerHTML={{ __html: content }} />}
            </div>
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
