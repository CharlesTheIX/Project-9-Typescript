"use client";
import { useState } from "react";
import HeroBanner from "@/components/Banners/HeroBanner";
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
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="globe"
          title="Edit Country"
          content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet.`}
          highlights={[
            {
              type: "link",
              content: "Create",
              href: "/admin/countries/create",
            },
            {
              type: "link",
              content: "Countries",
              href: "/admin/countries",
            },
            {
              type: "link",
              content: currentCountry?.displayName,
              href: `/countries/${currentCountry?._id}`,
            },
          ]}
        />

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
