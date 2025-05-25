"use client";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CountryEditForm from "@/components/Forms/CountryEditForm";
import FunctionalButton from "@/components/Buttons/FunctionalButton";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCountry, setCurrentCountry] = useState<Country>(country);

  return (
    <DefaultLayout>
      <section>
        <div>
          <h1>{currentCountry.displayName}</h1>

          <FunctionalButton
            callback={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </FunctionalButton>
        </div>
      </section>

      {isEditing ? (
        <CountryEditForm
          country={currentCountry}
          callback={(country: Country) => {
            setCurrentCountry(country);
            setIsEditing(false);
          }}
        />
      ) : (
        <p>Not editing</p>
      )}
    </DefaultLayout>
  );
};

export default CountryPage;
