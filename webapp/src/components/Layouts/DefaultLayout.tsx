"use client";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return (
    <main id="default-layout" className={`${theme} layout`}>
      {children}
    </main>
  );
};

export default DefaultLayout;
