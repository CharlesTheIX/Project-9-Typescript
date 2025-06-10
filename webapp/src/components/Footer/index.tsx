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
      <section className="footer">
        <nav>
          <ul>
            {navigationItems.map((item: NavigationItem, key: number) => {
              return (
                <Fragment key={key}>
                  <li key={key}>
                    <Link href={item.href} key={key} className="link-text">
                      {item.label}
                    </Link>
                  </li>

                  {key != navigationItems.length - 1 && <li>|</li>}
                </Fragment>
              );
            })}
          </ul>
        </nav>

        <p>
          Created by{" "}
          <Link href={"https://github.com/CharlesTheIX"} target="_blank" className="link-text">
            CharlesTheIX
          </Link>
          .
        </p>
      </section>

      <UserControls />
      <ImpersonationControls />
      <CookieBanner />
    </footer>
  );
};

export default Footer;
