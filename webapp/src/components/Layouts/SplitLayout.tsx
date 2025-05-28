"use client";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const SplitLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return (
    <main id="split-layout" className={theme}>
      <div>{children}</div>
    </main>
  );
};

export default SplitLayout;
