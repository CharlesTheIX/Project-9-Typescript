"use client";
import Link from "next/link";
import Profile_SVG from "@/SVGs/Profile_SVG";
import { useImpersonationContext } from "@/contexts/impersonationContext";
import StopImpersonationButton from "@/components/Buttons/StopImpersonationButton";

const ImpersonationControls: React.FC = () => {
  const impersonation = useImpersonationContext();

  if (!impersonation.user) return <></>;

  return (
    <div id="impersonation-controls">
      <ul>
        <li>
          <Link href={`/admin/users/${impersonation.user._id}`}>
            <Profile_SVG />

            <p>View User</p>
          </Link>
        </li>

        <li
          onClick={() => {
            impersonation.stopImpersonating();
          }}
        >
          <StopImpersonationButton />
          <p>Stop Impersonation</p>
        </li>
      </ul>

      <div>
        <Profile_SVG />

        <p>{impersonation.user.username}</p>
      </div>
    </div>
  );
};

export default ImpersonationControls;
