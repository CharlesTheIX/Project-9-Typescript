"use client";
import { useState } from "react";
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
    <main>
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
    </main>
  );
};

export default CountryPage;
