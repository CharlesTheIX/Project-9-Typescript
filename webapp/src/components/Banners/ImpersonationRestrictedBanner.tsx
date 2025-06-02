"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  acceptedRoles: UserRole[];
};

const ImpersonationRestrictedBanner: React.FC<Props> = (props: Props) => {
  const { acceptedRoles } = props;
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      {visible && impersonation.user && (
        <div id="impersonation-restricted-banner" className={theme}>
          <div className="background" />

          <section>
            <div>
              <p className="text-3xl max-w-3xl">
                The user <span className="font-bold admin">{impersonation.user?.username}</span> does not have access to
                this page.
              </p>

              <p className="font-bold admin">Accepted Roles: {acceptedRoles.join(", ")}</p>

              <div className="controls">
                <Link className="button" href={`/profile`}>
                  View User Profile
                </Link>

                <button
                  className="button"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  View Anyway
                </button>

                <button
                  className="button"
                  onClick={() => {
                    impersonation.stopImpersonating(`${pathname}`);
                  }}
                >
                  Stop Impersonation
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ImpersonationRestrictedBanner;
