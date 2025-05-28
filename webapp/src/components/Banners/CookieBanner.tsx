"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/contexts/themeContext";
import FunctionalButton from "../Buttons/FunctionalButton";
import { useBrowserContext } from "@/contexts/browserContext";

const noShowPathnames = ["/cookies"];

const CookieBanner: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const [show, setShow] = useState<boolean>(false);
  const { cookie, setCookie, updateCookie } = useBrowserContext();

  useEffect(() => {
    setShow(true);
  }, [cookie]);

  if (cookie || noShowPathnames.includes(pathname || "")) return;

  return (
    <div id="cookie-banner" className={`${theme} ${show && "show"}`}>
      <div>
        <div>
          <div>
            <h5>Cookie Banner</h5>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit quis sapien ac porta. Sed quis eros turpis. Proin suscipit augue sed nisi imperdiet,
              pharetra dignissim leo sagittis. Nulla eget egestas neque. In hac habitasse platea dictumst. Nullam et lacus leo. facilisis.{" "}
              <Link href={"/cookies"} className="link-text">
                Cookies policy.
              </Link>
            </p>
          </div>

          <div>
            <FunctionalButton
              callback={() => {
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
