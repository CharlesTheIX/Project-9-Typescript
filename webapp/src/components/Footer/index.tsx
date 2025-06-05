"use client";
import Link from "next/link";
import { Fragment } from "react";
import { navigationItems } from "./data";
import UserControls from "@/components/UserControls";
import { useThemeContext } from "@/contexts/themeContext";
import CookieBanner from "@/components/Banners/CookieBanner";
import ImpersonationControls from "@/components/ImpersonationControls";

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <footer className={theme}>
      <section>
        <div className="flex flex-row gap-2 pb-2 items-center justify-center wrap w-full">
          {navigationItems.map((item: NavigationItem, key: number) => {
            return (
              <Fragment key={key}>
                <Link href={item.href} className="link-text" key={key}>
                  {item.label}
                </Link>
                {key != navigationItems.length - 1 && <p>|</p>}
              </Fragment>
            );
          })}
        </div>

        <div className="flex flex-col text-center items-center justify-center">
          <p>
            Created by{" "}
            <Link className="link-text" href={"https://github.com/CharlesTheIX"} target="_blank">
              David Charles
            </Link>
            .
          </p>
          {/* <p>Copyright &copy; {new Date().getFullYear()}.</p> */}
        </div>
      </section>

      <UserControls />
      <ImpersonationControls />
      <CookieBanner />
    </footer>
  );
};

export default Footer;
