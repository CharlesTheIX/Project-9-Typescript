"use client";
import Link from "next/link";
import { NavigationItem } from "@/locals";
import { useThemeContext } from "@/contexts/themeContext";

type Props = {
  children: React.ReactNode;
};

const dashboardItems: NavigationItem[] = [
  {
    href: "/countries",
    label: "Countries",
  },
];

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { theme } = useThemeContext();

  return (
    <div className="flex flex-row gap-20 items-start justify-center min-h-screen px-10 w-screen mx-auto max-w-[1500px] all-width-100 relative overflow-visible">
      <aside id="dashboard-aside" className={`${theme}`}>
        <nav className="w-full">
          <ul className="flex flex-col gap-0 all-width-100 items-start justify-start">
            {dashboardItems.map((item: NavigationItem, key: number) => {
              return (
                <li key={key}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className={`${theme} flex flex-col1 mr-3xl min-h-full`}>{children}</main>;
    </div>
  );
};

export default DashboardLayout;
