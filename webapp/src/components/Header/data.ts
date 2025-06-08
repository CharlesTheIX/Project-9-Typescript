export const signedOutItems: NavigationItem[] = [
  {
    label: "Sign In",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
];

export const signedInItems: NavigationItem[] = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Countries",
    href: "/countries",
  },
  {
    label: "Games",
    href: "/games",
  },
];

export const adminItems: NavigationItem[] = [...signedInItems];
