"use client";
import Link from "next/link";
import Cog_SVG from "../SVGs/Cog_SVG";
import Admin_SVG from "../SVGs/Admin_SVG";
import Profile_SVG from "../SVGs/Profile_SVG";
import SignOutButton from "../Buttons/SingOutButton";
import { useUserContext } from "@/contexts/userContext";
import { useThemeContext } from "@/contexts/themeContext";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

const UserControls: React.FC = () => {
  const { theme } = useThemeContext();
  const { user, userRole } = useUserContext();

  return (
    <div id="user-controls" className={`${theme}`}>
      <ul className="flex flex-col">
        {user && (
          <>
            {userRole === "admin" && (
              <li>
                <Link href={"/admin"}>
                  <Admin_SVG />
                </Link>
              </li>
            )}

            <li>
              <Link href="/dashboard">
                <Profile_SVG />
              </Link>
            </li>

            <li>
              <SignOutButton />
            </li>
          </>
        )}

        <li>
          <ThemeToggleButton />
        </li>
      </ul>

      <div>
        <Cog_SVG />
      </div>
    </div>
  );
};

export default UserControls;
