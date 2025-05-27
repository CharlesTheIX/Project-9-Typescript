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
        <div className="py-10 flex flex-col gap-5">
          <h1>Countries</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>

          {userRole === "admin" && (
            <div>
              <Link className="button" href="/countries/create">
                Create
              </Link>
            </div>
          )}
        </div>
      </section>

      <section>
        <CountryFeed />
      </section>
    </DefaultLayout>
  );
};

export default CountriesPage;
