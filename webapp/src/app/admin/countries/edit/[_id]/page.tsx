import { Metadata } from "next";
import { notFound } from "next/navigation";
import CountryEditPage from "@/pages/Countries/edit";
import getCountryById from "@/lib/countries/getCountryById";
import getAllCountries from "@/lib/countries/getAllCountries";

type Params = Promise<{ _id: string }>;

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const { _id } = await params;

  try {
    const response = await getCountryById(_id);
    if (response.error) throw new Error();
    return {
      title: `Edit ${response.data.displayName} | Admin | P9`,
      description: `${response.data.displayName}`
    };
  } catch (error: any) {
    return {
      title: "404 | P9",
      description: "Country not found",
      robots: "noindex, nofollow"
    };
  }
};

export const generateStaticParams = async (): Promise<{ _id: string }[]> => {
  try {
    const response = await getAllCountries(500);
    if (response.error) throw new Error();
    return response.data.map((country: Country) => {
      return { _id: country._id };
    });
  } catch (error: any) {
    return [];
  }
};

const Page = async ({ params }: { params: Params }): Promise<React.JSX.Element> => {
  try {
    const { _id } = await params;
    const response = await getCountryById(_id);
    if (response.error) throw new Error(response.message);
    return <CountryEditPage country={response.data} />;
  } catch (error: any) {
    notFound();
  }
};
export default Page;
