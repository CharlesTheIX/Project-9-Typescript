import { Metadata } from "next";
import { notFound } from "next/navigation";
import NotificationEditPage from "@/pages/Notifications/edit";
import getNotificationById from "@/lib/notifications/getNotificationById";
import getAllNotifications from "@/lib/notifications/getAllNotifications";

type Params = Promise<{ _id: string }>;

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const { _id } = await params;

  try {
    const response = await getNotificationById({ _id, options: {} });
    if (response.error) throw new Error();
    return {
      title: `Edit ${response.data.displayName} | Admin | P9`,
      description: `${response.data.displayName}`,
    };
  } catch (error: any) {
    return {
      title: "404 | P9",
      description: "Notification not found",
      robots: "noindex, nofollow",
    };
  }
};

export const generateStaticParams = async (): Promise<{ _id: string }[]> => {
  try {
    const response = await getAllNotifications({ limit: 500 });
    if (response.error) throw new Error();
    return response.data.map((user: User) => {
      return { _id: user._id };
    });
  } catch (error: any) {
    return [];
  }
};

const Page = async ({ params }: { params: Params }): Promise<React.JSX.Element> => {
  try {
    const { _id } = await params;
    const response = await getNotificationById({ _id, options: {} });
    if (response.error) throw new Error(response.message);
    return <NotificationEditPage notification={response.data} />;
  } catch (error: any) {
    notFound();
  }
};
export default Page;
