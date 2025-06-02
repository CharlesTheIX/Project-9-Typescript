"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useImpersonationContext } from "@/contexts/impersonationContext";

const ProfilePage: React.FC = () => {
  const user = useUserContext();
  const impersonate = useImpersonationContext();
  const [currentUser, setCurrentUser] = useState<User | null>(user.user);

  useEffect(() => {
    if (impersonate.user) return setCurrentUser(impersonate.user);
    setCurrentUser(user.user);
  }, [impersonate]);

  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10">
          <h1>Profile: {currentUser?.username}</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ProfilePage;
