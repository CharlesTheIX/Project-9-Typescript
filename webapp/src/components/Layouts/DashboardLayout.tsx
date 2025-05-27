"use client";
import Link from "next/link";
import { NavigationItem } from "@/locals";
import Globe_SVG from "../SVGs/Globe_SVG";
import Profile_SVG from "../SVGs/Profile_SVG";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const dashboardItems: NavigationItem[] = [
  {
    href: "/profile",
    label: "Profile",
    icon: "profile",
  },
  {
    href: "/countries",
    label: "Countries",
    icon: "globe",
  },
];

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return (
    <div id="dashboard-layout" className={`${theme} px-10`}>
      <div>
        <aside>
          <nav className="w-full">
            <ul className="flex flex-col items-start justify-start w-full">
              {dashboardItems.map((item: NavigationItem, key: number) => {
                return (
                  <li key={key}>
                    <Link href={item.href} className="gap-2 flex flex-row items-center justify-start">
                      {item.icon === "profile" && <Profile_SVG />}
                      {item.icon === "globe" && <Globe_SVG />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        <main className={`${theme} flex flex-col min-h-full w-full`}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
