"use client";
import Link from "next/link";
import * as NI from "./navigationItems";
import { useUser } from "@clerk/nextjs";
import { NavigationItem } from "@/locals";
// import Admin_SVG from "../SVGs/Admin_SVG";
// import Profile_SVG from "../SVGs/Profile_SVG";
import { useUserContext } from "@/contexts/userContext";
import Terminal_SVG from "@/components/SVGs/Terminal_SVG";
import { useThemeContext } from "@/contexts/themeContext";
// import { useImpersonationContext } from "@/contexts/impersonationContext";

const Header: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, isLoaded } = useUser();
  const userContext = useUserContext();
  // const impersonation = useImpersonationContext();

  const getHeaderLogo = () => {
    switch (userContext.userRole) {
      // case "admin":
      //   if (impersonation.user) {
      //     return (
      //       <Link href="/" className={`${theme} header-logo`}>
      //         <div className="flex flex-col">
      //           <Profile_SVG width={50} height={50} />
      //           <span className="text-xs font-bold w-full">{impersonation.user.role}</span>
      //         </div>
      //         <p>P9</p>
      //       </Link>
      //     );
      //   }

      //   return (
      //     <Link href="/" className={`${theme} header-logo`}>
      //       <Admin_SVG width={50} height={50} />
      //       <p>P9</p>
      //     </Link>
      //   );
      default:
        return (
          <Link href="/" className={`${theme} header-logo`}>
            <Terminal_SVG width={50} height={50} />
            <p>P9</p>
          </Link>
        );
    }
  };

  return (
    <header id="header" className={`${theme}  relative`}>
      <div className="main">
        <div>
          {getHeaderLogo()}

          {isLoaded && (
            <nav>
              <ul>
                {!user ? (
                  <>
                    {NI.signedOutItems.map((item: NavigationItem, key: number) => {
                      return (
                        <li key={key}>
                          <Link href={item.href} className="button">
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {userContext.userRole === "admin" ? (
                      <>
                        {NI.adminItems.map((item: NavigationItem, key: number) => {
                          return (
                            <li key={key}>
                              <Link href={item.href} className="button">
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {NI.signedInItems.map((item: NavigationItem, key: number) => {
                          return (
                            <li key={key}>
                              <Link href={item.href} className="button">
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
