"use client";
import { useEffect } from "react";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const SplitLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  useEffect(() => {
    impersonation.setAcceptedRoles(roles);
  }, [impersonation.user]);

  return (
    <main id="split-layout" className={`${theme} layout`}>
      {children}
    </main>
  );
};

export default SplitLayout;
