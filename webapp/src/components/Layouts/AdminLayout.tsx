"use client";
import Link from "next/link";
import { NavigationItem } from "@/locals";
import Users_SVG from "../SVGs/Users_SVG";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const dashboardItems: NavigationItem[] = [
  {
    href: "/users",
    label: "Users",
    icon: "users",
  },
];

const AdminLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return (
    <div id="admin-layout" className={`${theme} px-10`}>
      <div>
        <aside>
          <nav className="w-full">
            <ul className="flex flex-col items-start justify-start w-full">
              {dashboardItems.map((item: NavigationItem, key: number) => {
                return (
                  <li key={key}>
                    <Link href={item.href} className="gap-2 flex flex-row items-center justify-start">
                      {item.icon === "users" && <Users_SVG />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className={`${theme} flex flex-col min-h-full`}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
