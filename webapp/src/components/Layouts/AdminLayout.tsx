"use client";
import Link from "next/link";
import { useEffect } from "react";
import Users_SVG from "@/SVGs/Users_SVG";
import Globe_SVG from "@/SVGs/Globe_SVG";
import { useThemeContext } from "@/contexts/themeContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  roles?: UserRole[];
  children: React.ReactNode;
};

const dashboardItems: NavigationItem[] = [
  {
    href: "/admin/users",
    label: "Users",
    icon: "users"
  },
  {
    href: "/admin/countries",
    label: "Countries",
    icon: "globe"
  }
];

const AdminLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  useEffect(() => {
    impersonation.setAcceptedRoles(roles);
  }, [impersonation.user]);

  return (
    <div id="admin-layout" className={`${theme} layout`}>
      <div>
        <aside>
          <nav>
            <ul>
              {dashboardItems.map((item: NavigationItem, key: number) => {
                return (
                  <li key={key}>
                    <Link href={item.href}>
                      {item.icon === "users" && <Users_SVG />}
                      {item.icon === "globe" && <Globe_SVG />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className={theme}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
