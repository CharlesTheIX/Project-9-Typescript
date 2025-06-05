"use client";
import { useClerk } from "@clerk/nextjs";
import SignOut_SVG from "@/SVGs/SignOut_SVG";
import { useUserContext } from "@/contexts/userContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  className?: string;
};

const SignOutButton: React.FC<Props> = (props: Props) => {
  const { className = "" } = props;
  const { signOut } = useClerk();
  const { setToggle } = useUserContext();
  const impersonation = useImpersonationContext();

  return (
    <button
      className={`${className} outline-none cursor-pointer appearance-none`}
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
