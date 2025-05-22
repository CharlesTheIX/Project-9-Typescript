import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import SignOutButton from "../Buttons/SingOutButton";

type NavigationItem = {
  href: string;
  label: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Countries",
    href: "/countries",
  },
  {
    label: "Sign In",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
  {
    label: "Blank",
    href: "/",
  },
];

const Header: React.FC = async () => {
  const user = await currentUser();

  return (
    <header className="py-5 bg-white sticky top-0">
      <div className="flex flex-row gap-5 px-5 items-center justify-between max-w-7xl mx-auto">
        <div>
          <Link href="/">
            <Image src="/assets/images/flags/oman.png" width={50} height={36} alt="Brand logo" />
          </Link>
        </div>

        <nav className="flex flex-row gap-5 items-center">
          <ul className="flex flex-row gap-5 items-center text-black">
            {navigationItems.map((item: NavigationItem, key: number) => {
              return (
                <li key={key}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
            })}
          </ul>

          { user && <SignOutButton /> }
        </nav>
      </div>
    </header>
  );
};

export default Header;
