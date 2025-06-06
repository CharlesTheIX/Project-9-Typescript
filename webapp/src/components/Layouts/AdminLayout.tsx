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
    icon: "users",
  },
  {
    href: "/admin/countries",
    label: "Countries",
    icon: "globe",
  },
];

const AdminLayout: React.FC<Props> = (props: Props) => {
  const { children, roles = [] } = props;
  const { theme } = useThemeContext();
  const impersonation = useImpersonationContext();

  useEffect(() => {
    impersonation.setAcceptedRoles(roles);
  }, [impersonation.user]);

  return (
    <div id="admin-layout" className={`${theme} p-20 gap-20`}>
      <div className="pb-10 gap-10 w-full flex my-0 mx-auto overflow-visible relative flex-row items-start justify-end">
        <aside className="w-full flex sticky flex-col items-start justify-start">
          <nav className="w-full">
            <ul className="w-full h-full flex overflow-hidden flex-col items-start justify-start">
              {dashboardItems.map((item: NavigationItem, key: number) => {
                return (
                  <li key={key} className="px-5 py-2 w-full cursor-pointer font-bold">
                    <Link href={item.href} className="gap-2 flex flex-row items-center justify-start">
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
        <main className={`${theme} gap-10 w-full flex min-h-screen flex-col`}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
