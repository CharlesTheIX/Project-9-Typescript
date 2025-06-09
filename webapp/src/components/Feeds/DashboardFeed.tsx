"use client";
import Link from "next/link";
import getSvg from "@/lib/getSvg";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/userContext";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type CardData = {
  href?: string;
  icon?: string;
  content?: string;
  callback?: () => void;
  type: "text" | "link" | "function";
};

const cards: CardData[] = [
  {
    type: "link",
    icon: "profile",
    href: "/profile",
    content: "Profile",
  },
  {
    type: "link",
    icon: "globe",
    href: "/countries",
    content: "Countries",
  },
];

const DashboardFeed: React.FC = () => {
  const { user } = useUserContext();
  const impersonation = useImpersonationContext();
  const [targetUser, setTargetUser] = useState<User | null>(user);

  useEffect(() => {
    if (impersonation.user) {
      setTargetUser(impersonation.user);
      return;
    }
    setTargetUser(user);
  }, [user, impersonation.user]);

  return (
    <div className="flex flex-row flex-wrap gap-5 items-center justify-start">
      {targetUser?.role === "admin" && (
        <div className="card dashboard-card relative">
          <Link href="/admin" className="absolute top-0 left-0 w-full h-full z-1" />

          <div className="flex flex-col gap-2 items-start justify-between min-h-[100px] relative">
            <div className="absolute bottom-2 right-2">{getSvg({ icon: "admin", size: 40 })}</div>
            <p className="font-bold text-3xl pr-[50px] pb-[50px]">Admin</p>
          </div>
        </div>
      )}

      {cards.map((card: CardData, key: number) => {
        return (
          <div className="card dashboard-card" key={key}>
            {card.type === "link" && card.href && (
              <Link href={card.href} className="absolute top-0 left-0 w-full h-full z-1" />
            )}

            {card.type === "function" && card.callback && (
              <div onClick={card.callback} className="absolute top-0 left-0 w-full h-full z-1" />
            )}

            <div className="flex flex-col gap-2 items-start justify-between min-h-[100px] relative">
              {card.icon && <div className="absolute bottom-2 right-2">{getSvg({ icon: card.icon, size: 40 })}</div>}
              {card.content && <p className="font-bold text-3xl pr-[50px] pb-[50px]">{card.content}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardFeed;
