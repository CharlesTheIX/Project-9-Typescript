"use client";
import { useState } from "react";
import HeroBanner from "@/components/Banners/HeroBanner";
import UserEditForm from "@/components/Forms/UserEditForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useImpersonationContext } from "@/contexts/impersonationContext";

type Props = {
  user: User;
};

const roles: UserRole[] = ["admin"];

const UserEditPage: React.FC<Props> = (props: Props) => {
  const { user } = props;
  const { impersonate } = useImpersonationContext();
  const [currentUser, setCurrentUser] = useState<User>(user);

  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="users"
          title="Edit User"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
          highlights={[
            {
              type: "link",
              content: "Users",
              href: "/admin/users",
            },
            {
              type: "function",
              content: currentUser?.username,
              callback: () => {
                impersonate(user, "/dashboard");
              },
            },
          ]}
        />

        <UserEditForm
          user={currentUser}
          callback={(value: User) => {
            setCurrentUser(value);
          }}
        />
      </section>
    </DefaultLayout>
  );
};

export default UserEditPage;
