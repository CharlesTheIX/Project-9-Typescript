"use client";
import { useThemeContext } from "@/contexts/themeContext";

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <footer className={`theme-${theme} px-10 py-5`}>
      <section>
        <div>
          <div className="flex flex-col text-[10px] text-center">
            <p>Created by David Charles.</p>
            <p>Copyright &copy; {new Date().getFullYear()}.</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
