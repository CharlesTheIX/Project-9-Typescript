"use client";
import { useEffect } from "react";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  useEffect(() => {
    impersonation.setAcceptedRoles(roles);
  }, [impersonation.user]);

  return (
    <main id="default-layout" className={`${theme} p-20 gap-20 flex min-h-screen flex-col`}>
      {children}
    </main>
  );
};

export default DefaultLayout;
