"use client";
import Link from "next/link";
import Cog_SVG from "@/SVGs/Cog_SVG";
import Admin_SVG from "@/SVGs/Admin_SVG";
import Profile_SVG from "@/SVGs/Profile_SVG";
import { useUserContext } from "@/contexts/userContext";
import SignOutButton from "@/components/Buttons/SingOutButton";
import ThemeToggleButton from "@/components/Buttons/ThemeToggleButton";

const UserControls: React.FC = () => {
  const { user, userRole } = useUserContext();

  return (
    <div id="user-controls">
      <ul>
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
              <Link href="/profile">
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
