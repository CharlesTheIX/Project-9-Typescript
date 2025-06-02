"use client";
import Link from "next/link";
import UserControls from "@/components/UserControls";
import { useThemeContext } from "@/contexts/themeContext";
import ImpersonationControls from "./ImpersonationControls";
import CookieBanner from "@/components/Banners/CookieBanner";

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <footer className={theme}>
      <section>
        <div>
          <p>
            Created by{" "}
            <Link className="link-text" href={"https://github.com/CharlesTheIX"} target="_blank">
              David Charles
            </Link>
            .
          </p>
          <p>Copyright &copy; {new Date().getFullYear()}.</p>
        </div>
      </section>

      <UserControls />
      <ImpersonationControls />
      <CookieBanner />
    </footer>
  );
};

export default Footer;
