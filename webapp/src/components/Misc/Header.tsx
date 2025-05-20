import Link from "next/link";
import Image from "next/image";

type NavigationItem = {
  href: string;
  label: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Countries",
    href: "/countries"
  },
  {
    label: "Blank",
    href: "/"
  },
  {
    label: "Blank",
    href: "/"
  },
  {
    label: "Blank",
    href: "/"
  }
];

const Header: React.FC = () => {
  return (
    <header className="py-5 bg-white sticky top-0">
      <div className="flex flex-row gap-5 px-5 items-center justify-between max-w-7xl mx-auto">
        <div>
          <Link href="/">
            <Image src="/assets/images/flag-oman.png" width={50} height={36} alt="Brand logo" />
          </Link>
        </div>

        <nav>
          <ul className="flex flex-row gap-5 items-center text-black">
            {navigationItems.map((item: NavigationItem, key: number) => {
              return (
                <li key={key}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
