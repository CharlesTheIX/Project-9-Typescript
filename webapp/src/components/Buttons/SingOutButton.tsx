"use client";
import { useClerk } from "@clerk/nextjs";
import SignOut_SVG from "../SVGs/SignOut_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { setToggle } = useUserContext();
  const impersonation = useImpersonationContext();

  return (
    <button
      id="sign-out-button"
      onClick={async () => {
        await signOut().then(() => {
          impersonation.stopImpersonating(null);
          setToggle("sign-out");
        });
      }}
    >
      <SignOut_SVG />
    </button>
  );
};

export default SignOutButton;
