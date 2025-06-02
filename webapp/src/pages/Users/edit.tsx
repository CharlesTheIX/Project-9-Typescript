"use client";
import Link from "next/link";
import { useState } from "react";
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
      <section>
        <div className="flex flex-col gap-10 item-center">
          <div className="flex flex-row gap-5 items-start justify-start">
            <div className="flex flex-col gap-0 justify-start">
              <h1>User:</h1>

              <Link href={"/admin/users"} className="link-text">
                Users
              </Link>
            </div>

            <p
              className="text-7xl link-text"
              onClick={() => {
                impersonate(user, "/dashboard");
              }}
            >
              {currentUser.username}
            </p>
          </div>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. :W Donec gravida semper lectus, eu aliquet
            erat ornare sit amet.
          </p>

          <UserEditForm
            user={currentUser}
            callback={(value: User) => {
              setCurrentUser(value);
            }}
          />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default UserEditPage;
