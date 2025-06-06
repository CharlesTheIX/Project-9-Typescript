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
    <div id="user-controls" className="fixed bottom-5 left-10">
      <ul className="flex overflow-hidden flex-col">
        {user && (
          <>
            {userRole === "admin" && (
              <li>
                <Link href={"/admin"} className="p-2 pb-0 inline-block">
                  <Admin_SVG />
                </Link>
              </li>
            )}

            <li>
              <Link href="/profile" className="p-2 pb-0 inline-block">
                <Profile_SVG />
              </Link>
            </li>

            <li>
              <SignOutButton className="p-2" />
            </li>
          </>
        )}

        <li>
          <ThemeToggleButton className="p-2" />
        </li>
      </ul>

      <div className="p-2 cursor-pointer">
        <Cog_SVG />
      </div>
    </div>
  );
};

export default UserControls;
