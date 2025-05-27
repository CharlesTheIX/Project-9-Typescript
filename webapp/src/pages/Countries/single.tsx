"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const { userRole } = useUserContext();
  const [currentCountry, setCurrentCountry] = useState<Country>(country);

  return (
    <DefaultLayout>
      <section>
        <div className="py-10 flex flex-col gap-5 item-center">
          <h1>{currentCountry.displayName}</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin.
            Donec gravida semper lectus, eu aliquet erat ornare sit amet.
          </p>

          {userRole === "admin" && (
            <div>
              <Link className="button" href={`/countries/edit/${country._id}`}>
                Edit
              </Link>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CountryPage;
