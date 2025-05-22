"use client";

import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
