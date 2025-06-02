"use client";
import Link from "next/link";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryEditForm from "@/components/Forms/CountryEditForm";

type Props = {
  country: Country;
};

const roles: UserRole[] = ["admin", "editor"];

const CountryEditPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const [currentCountry, setCurrentCountry] = useState<Country>(country);

  return (
    <DefaultLayout roles={roles}>
      <section>
        <div className="flex flex-col gap-10 item-center">
          <div className="flex flex-col gap-0 items-start justify-start">
            <div className="flex flex-row gap-1 justify-start">
              <h1>Country:</h1>

              <Link href={`/countries/${currentCountry._id}`} className="text-7xl font-bold link-text">
                {currentCountry.displayName}
              </Link>
            </div>

            <p className="highlight font-bold">
              <Link href={"/admin/countries/create"} className="link-text">
                Create
              </Link>{" "}
              |{" "}
              <Link className="link-text" href={"/admin/countries"}>
                Countries
              </Link>
            </p>
          </div>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. :W Donec gravida semper lectus, eu aliquet
            erat ornare sit amet.
          </p>

          <CountryEditForm
            country={currentCountry}
            callback={(value: Country) => {
              setCurrentCountry(value);
            }}
          />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountryEditPage;
