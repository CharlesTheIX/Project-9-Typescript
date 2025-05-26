"use client";
import { useClerk } from "@clerk/nextjs";
import { useUserContext } from "@/contexts/userContext";
import SignOut_SVG from "../SVGs/SignOut_SVG";

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { setToggle } = useUserContext();

  return (
    <button
      id="sign-out-button"
      onClick={async () => {
        await signOut().then(() => {
          setToggle("sign-out");
        });
      }}
    >
      <SignOut_SVG />
    </button>
  );
};

export default SignOutButton;
