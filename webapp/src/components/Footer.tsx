"use client";
import UserControls from "@/components/UserControls";
import { useThemeContext } from "@/contexts/themeContext";
import CookieBanner from "@/components/Banners/CookieBanner";

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <footer className={theme}>
      <section>
        <div>
          <p>Created by David Charles.</p>
          <p>Copyright &copy; {new Date().getFullYear()}.</p>
        </div>
      </section>

      <UserControls />
      <CookieBanner />
    </footer>
  );
};

export default Footer;
