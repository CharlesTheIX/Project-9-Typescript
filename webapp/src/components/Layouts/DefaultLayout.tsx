"use client";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";
import ImpersonationRestrictedBanner from "../Banners/ImpersonationRestrictedBanner";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const DefaultLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  return (
    <>
      <main id="default-layout" className={`${theme} layout`}>
        {children}
      </main>
      {roles.length > 0 && impersonation.user && !roles.includes(impersonation.user.role) && (
        <ImpersonationRestrictedBanner acceptedRoles={roles} />
      )}
    </>
  );
};

export default DefaultLayout;
