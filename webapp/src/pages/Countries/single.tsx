"use client";
import { useState } from "react";
import FunctionalButton from "@/components/Buttons/FunctionalButton";

type Props = {
  country: Country;
};

const CountryPage: React.FC<Props> = (props: Props) => {
  const { country } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <main>
      <section>
        <div>
          <h1>{country?.displayName}</h1>

          <FunctionalButton
            callback={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </FunctionalButton>
        </div>
      </section>

      {isEditing ? <p>Editing</p> : <p>Not editing</p>}
    </main>
  );
};

export default CountryPage;
