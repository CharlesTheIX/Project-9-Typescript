"use client";
import { useClerk } from "@clerk/nextjs";
import SignOut_SVG from "../SVGs/SignOut_SVG";
import { useUserContext } from "@/contexts/userContext";

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { setToggle } = useUserContext();

  return (
    <button
      id="sign-out-button"
      className="cursor-pointer"
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
