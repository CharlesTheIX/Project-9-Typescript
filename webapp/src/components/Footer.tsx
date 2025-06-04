"use client";
import Link from "next/link";
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
        <Link href="/tech-stack" className="link-text">Tech Stack</Link>
        <p>|</p>
        <Link href="/terms-conditions" className="link-text">Terms & Conditions</Link>
        <p>|</p>
        <Link href="/cookies" className="link-text">Cookies</Link>
      </div>

        <div className="flex flex-col text-center items-center justify-center">
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
