"use client";

import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <button
      className=""
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </button>
  );
};
