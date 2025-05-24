"use client";
import Link from "next/link";
import Image from "next/image";
import * as NI from "./navigationItems";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import SignOutButton from "@/components/Buttons/SingOutButton";
import ThemeToggleButton from "@/components/Buttons/ThemeToggleButton";

const Header: React.FC = () => {
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  return (
    <header className={`py-5 bg-white sticky top-0 theme-${theme}`}>
      <div className="flex flex-row gap-5 px-5 items-center justify-between max-w-7xl mx-auto">
        <div>
          <Link href="/">
            <Image src="/assets/images/flags/oman.png" width={50} height={36} alt="Brand logo" />
          </Link>
        </div>

        <nav className="flex flex-row gap-5 items-center">
          <ul className="flex flex-row gap-5 items-center text-black">
            {!user ? (
              <>
                {NI.signedOutNavigationItems.map((item: NI.NavigationItem, key: number) => {
                  return (
                    <li key={key}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                {user.role === "admin" ? (
                  <>
                    {NI.adminNavigationItems.map((item: NI.NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {NI.signedInNavigationItems.map((item: NI.NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      );
                    })}
                  </>
                )}

                <li>
                  <SignOutButton />
                </li>
              </>
            )}

            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
