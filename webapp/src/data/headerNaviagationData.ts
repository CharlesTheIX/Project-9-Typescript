export const signedOutItems: NavigationItem[] = [
  {
    label: "Sign In",
    href: "/sign-in"
  },
  {
    label: "Sign Up",
    href: "/sign-up"
  }
];

export const signedInItems: NavigationItem[] = [
  {
    label: "Countries",
    href: "/countries"
  }
];

export const adminItems: NavigationItem[] = [...signedInItems];
