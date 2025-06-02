"use client";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";
import ImpersonationRestrictedBanner from "../Banners/ImpersonationRestrictedBanner";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  return (
    <>
      <div id="dashboard-layout" className={`${theme} layout`}>
        <div>
          <main className={theme}>{children}</main>
        </div>
      </div>
      {roles.length > 0 && impersonation.user && !roles.includes(impersonation.user.role) && (
        <ImpersonationRestrictedBanner acceptedRoles={roles} />
      )}
    </>
  );
};

export default DashboardLayout;
