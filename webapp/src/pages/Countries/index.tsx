"use client";
import Link from "next/link";
import { useUserContext } from "@/contexts/userContext";
import CountryFeed from "@/components/Feeds/CountryFeed";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CountriesPage: React.FC = () => {
  const { userRole } = useUserContext();

  return (
    <DefaultLayout>
      <section>
        <div>
          <h1>Countries</h1>
          {userRole === "admin" && <Link href="/countries/create">Create</Link>}
        </div>
      </section>

      <section>
        <CountryFeed />
      </section>
    </DefaultLayout>
  );
};

export default CountriesPage;
