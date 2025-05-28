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
    <div id="dashboard-layout" className={theme}>
      <div>
        <aside>
          <nav>
            <ul>
              {dashboardItems.map((item: NavigationItem, key: number) => {
                return (
                  <li key={key}>
                    <Link href={item.href}>
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
        <main className={theme}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
