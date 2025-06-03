"use client";
import { useEffect, useState } from "react";
import TabContainer from "@/components/TabContainer";
import { profileTabs } from "@/data/profileTabsData";
import { useUserContext } from "@/contexts/userContext";
import HeroBanner from "@/components/Banners/HeroBanner";
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
        <HeroBanner
          icon="profile"
          title="Profile"
          content="Here, you can manage your personal details and customize your app experience. View and update your personal details or fine-tune your application set-up to suit your preferences. Everything you need to personalize your account is right at your fingertips."
          highlights={[
            {
              type: "text",
              content: currentUser?.username || "",
            },
          ]}
        />
      </section>

      <section>
        <TabContainer tabs={profileTabs} />
      </section>
    </DefaultLayout>
  );
};

export default ProfilePage;
