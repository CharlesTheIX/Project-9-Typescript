"use client";
import { useClerk } from "@clerk/nextjs";
import { useUserContext } from "@/contexts/userContext";

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { setToggle } = useUserContext();

  return (
    <button
      id="sign-out-button"
      className={`button`}
      onClick={async () => {
        await signOut().then(() => {
          setToggle("sign-out");
        });
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
