"use client";
import SignOut_SVG from "@/SVGs/SignOut_SVG";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  className?: string;
};

const SignOutButton: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const impersonation = useImpersonationContext();

  return (
    <button
      className={`${className} outline-none cursor-pointer appearance-none`}
      onClick={() => {
        impersonation.stopImpersonating(null);
      }}
    >
      <SignOut_SVG />
    </button>
  );
};

export default SignOutButton;
