"use client";
import { useEffect } from "react";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  useEffect(() => {
    impersonation.setAcceptedRoles(roles);
  }, [impersonation.user]);

  return (
    <div id="dashboard-layout" className={`${theme} layout`}>
      <div>
        <main className={theme}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
