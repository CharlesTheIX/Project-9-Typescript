export type NavigationItem = {
  href: string;
  label: string;
};

export const signedOutNavigationItems: NavigationItem[] = [
  {
    label: "Sign In",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
];

export const signedInNavigationItems: NavigationItem[] = [
  {
    label: "Countries",
    href: "/countries",
  },
];

export const adminNavigationItems: NavigationItem[] = [...signedInNavigationItems];
