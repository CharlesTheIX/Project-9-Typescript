"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/contexts/themeContext";
import FunctionalButton from "../Buttons/FunctionalButton";
import { useCookieContext } from "@/contexts/cookieContext";

const noShowPathnames = ["/cookies", "/404"];

const CookieBanner: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const [show, setShow] = useState<boolean>(false);
  const { cookie, setCookie, updateCookie } = useCookieContext();

  useEffect(() => {
    console.log(pathname);
    setShow(true);
  }, [cookie]);

  if (cookie || noShowPathnames.includes(pathname || "")) return;

  return (
    <div id="cookie-banner" className={`${theme} ${show && "show"}`}>
      <div className="w-full py-5 px-50">
        <div className="flex flex-row gap-20 items-center justify-between max-w-7xl w-full mx-auto">
          <div className="flex flex-col gap-1 items-left">
            <h5 className="font-bold">Cookie Banner</h5>

            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit quis sapien ac porta. Sed quis eros turpis. Proin suscipit augue sed nisi imperdiet,
              pharetra dignissim leo sagittis. Nulla eget egestas neque. In hac habitasse platea dictumst. Nullam et lacus leo. facilisis.{" "}
              <Link href={"/cookies"} className="link-text">
                Cookies policy.
              </Link>
            </p>
          </div>

          <div className="flex flex-row gap-5">
            <FunctionalButton
              callback={() => {
                console.log("testing");
                updateCookie(true);
              }}
            >
              Accept
            </FunctionalButton>

            <FunctionalButton
              callback={() => {
                setCookie({ name: "null", value: true });
              }}
            >
              Reject
            </FunctionalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
