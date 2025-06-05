"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBrowserContext } from "@/contexts/browserContext";

const noShowPathnames = ["/cookies"];

const CookieBanner: React.FC = () => {
  const pathname = usePathname();
  const [show, setShow] = useState<boolean>(false);
  const { cookie, setCookie, updateCookie } = useBrowserContext();

  useEffect(() => {
    if (cookie) return;
    setShow(true);
  }, [cookie]);

  if (cookie || noShowPathnames.includes(pathname || "")) return;

  return (
    <div
      id="cookie-banner"
      className={`${show && "show"} top-0 left-0 w-screen h-screen fixed flex flex-col justify-end`}
    >
      <div className="py-5 px-10 w-full">
        <div className="gap-20 max-w-7xl w-full flex flex-row my-0 mx-auto items-center justify-between">
          <div className="gap-1 flex flex-col text-left">
            <h5>Cookie Banner</h5>

            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit quis sapien ac porta. Sed quis
              eros turpis. Proin suscipit augue sed nisi imperdiet, pharetra dignissim leo sagittis. Nulla eget egestas
              neque. In hac habitasse platea dictumst. Nullam et lacus leo. facilisis.{" "}
              <Link href={"/cookies"} className="link-text">
                Cookies policy.
              </Link>
            </p>
          </div>

          <div className="gap-5 flex flex-row">
            <button
              type="button"
              className="button"
              onClick={() => {
                updateCookie(true);
              }}
            >
              Accept
            </button>

            <button
              type="button"
              className="button"
              onClick={() => {
                setCookie({ name: "null", value: true });
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
