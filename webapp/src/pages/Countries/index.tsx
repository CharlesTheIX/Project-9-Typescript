"use client";
import Link from "next/link";
import Create_SVG from "@/components/SVGs/Create_SVG";
import { useUserContext } from "@/contexts/userContext";
import CountryFeed from "@/components/Feeds/CountryFeed";
import { useThemeContext } from "@/contexts/themeContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountriesTable from "@/components/Tables/CountriesTable";

const CountriesPage: React.FC = () => {
  const { theme } = useThemeContext();
  const { userRole } = useUserContext();

  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-5 items-center">
            {userRole === "admin" && (
              <Link className={`${theme}`} href="/countries/create">
                <Create_SVG width={60} height={60} />
              </Link>
            )}

            <h1>Countries</h1>
          </div>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>

          {/* <CountryFeed /> */}
          <CountriesTable
            excludeKeys={[
              "__v",
              // "_id",
              // "names",
              // "imageUrl",
              // "languages",
              // "population",
              // "description",
              // "capitalCity",
              "mapRectangle",
              "flagRectangle",
            ]}
          />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountriesPage;
