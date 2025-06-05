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
    <div id="dashboard-layout" className={`${theme} p-20 gap-20`}>
      <div className="pb-10 gap-10 w-full flex my-0 mx-auto overflow-visible relative flex-row items-start justify-end">
        <main className={`${theme} gap-10 w-full flex min-h-screen flex-col`}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
