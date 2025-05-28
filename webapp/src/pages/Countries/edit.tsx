"use client";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryEditForm from "@/components/Forms/CountryEditForm";

type Props = {
  country: Country;
};

const CountryEditPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const [currentCountry, setCurrentCountry] = useState<Country>(country);

  return (
    <DefaultLayout>
      <section>
        <div className="flex flex-col gap-10 item-center">
          <h1>Edit Country: {currentCountry.displayName}</h1>

          <p className="max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. :W Donec gravida semper lectus, eu aliquet
            erat ornare sit amet.
          </p>
        </div>
      </section>

      <section>
        <CountryEditForm
          country={currentCountry}
          callback={(value: Country) => {
            setCurrentCountry(value);
          }}
        />
      </section>
    </DefaultLayout>
  );
};

export default CountryEditPage;
