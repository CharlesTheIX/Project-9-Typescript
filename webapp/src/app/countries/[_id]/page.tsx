import { JSX } from 'react';
import { Metadata } from 'next';
import * as gbl from '@/globals';
import { notFound } from 'next/navigation';
import CountryPage from '@/pages/Countries/single';
import getCountryById from '@/lib/countries/getCountryById';
import getAllCountries from '@/lib/countries/getAllCountries';

type Props = {
  params: {
    _id: string;
  };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { params } = props;
  const { _id } = params;

  try {
    const response = await getCountryById(_id);
    if (!response || response.error) throw new Error();
    const data: Country = response.data;
    return {
      title: `${data.displayName}`,
      description: `${data.displayName}`,
    };
  } catch (error: any) {
    return {
      title: '404 error | country not found',
      description: 'Country not found',
      robots: 'noindex, nofollow',
    };
  }
};

export const generateStaticParams = async (): Promise<string[]> => {
  try {
    const response = await getAllCountries();
    if (!response || response.error || response.status === gbl.status.NO_CONTENT) throw new Error();
    return response.data.map((country: Country) => country._id);
  } catch (error: any) {
    return [];
  }
};

const Page = async (props: Props): Promise<JSX.Element> => {
  const { params } = props;
  const { _id } = params;
  const response = await getCountryById(_id);
  if (!response || response.error) notFound();
  const country: Country = response.data;
  return <CountryPage country={country} />;
};

export default Page;
