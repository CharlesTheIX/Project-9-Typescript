"use client";
import SignOut_SVG from "../SVGs/SignOut_SVG";
import { useImpersonationContext } from "@/contexts/impersonationContext";

const StopImpersonationButton: React.FC = () => {
  const impersonation = useImpersonationContext();

  return (
    <button
      id="stop-impersonation-button"
      onClick={() => {
        impersonation.stopImpersonating(null);
      }}
    >
      <SignOut_SVG />
    </button>
  );
};

export default StopImpersonationButton;
