"use client";
import HeroBanner from "@/components/Banners/HeroBanner";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

type Props = {
  notification: NotificationData;
};

const roles: UserRole[] = ["admin"];

const NotificationEditPage: React.FC<Props> = (props: Props) => {
  const { notification } = props;

  return (
    <DefaultLayout roles={roles}>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="notification"
          title="Edit Notification"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
          highlights={[
            {
              type: "link",
              content: "Notifications",
              href: "/admin/notifications",
            },
          ]}
        />
      </section>
    </DefaultLayout>
  );
};

export default NotificationEditPage;
