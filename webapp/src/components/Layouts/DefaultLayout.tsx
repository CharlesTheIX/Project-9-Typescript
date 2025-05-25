"use client";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return <main className={`theme-${theme} flex flex-col gap-5 px-10 min-h-screen`}>{children}</main>;
};

export default DefaultLayout;
