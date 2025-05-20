"use client";

import { useEffect, useState } from "react";

export type ToastProps = {
  title?: string;
  content: string;
  timeout?: number;
  hidden?: boolean;
  className?: string;
  type: "success" | "error";
};

const Toast: React.FC<ToastProps> = (props: ToastProps) => {
  const { type, title, content, timeout = 5000, hidden = true, className = "" } = props;
  const [isHidden, setIsHidden] = useState<boolean>(hidden);

  useEffect(() => {
    if (isHidden) return;

    setTimeout(() => {
      setIsHidden(true);
    }, timeout);
  }, []);

  return (
    <>
      {!isHidden && (
        <div className={`${type === "success" ? "" : ""} ${className}`}>
          <div>
            {title && <p>{title}</p>}

            <p dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
