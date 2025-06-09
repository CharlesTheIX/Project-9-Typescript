import { Metadata } from "next";
import { notFound } from "next/navigation";
import UserEditPage from "@/pages/Users/edit";
import getUserById from "@/lib/users/getUserById";
import getAllUsers from "@/lib/users/getAllUsers";

type Params = Promise<{ _id: string }>;

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const { _id } = await params;

  try {
    const response = await getUserById({ _id, options: {} });
    if (response.error) throw new Error();
    return {
      title: `Edit ${response.data.displayName} | Admin | P9`,
      description: `${response.data.displayName}`,
    };
  } catch (error: any) {
    return {
      title: "404 | P9",
      description: "User not found",
      robots: "noindex, nofollow",
    };
  }
};

export const generateStaticParams = async (): Promise<{ _id: string }[]> => {
  try {
    const response = await getAllUsers({ limit: 500 });
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
    const response = await getUserById({ _id, options: {} });
    if (response.error) throw new Error(response.message);
    return <UserEditPage user={response.data} />;
  } catch (error: any) {
    notFound();
  }
};
export default Page;
