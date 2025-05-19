"use client";

import { useState, useEffect } from "react";
import LoadingContainer from "../Misc/LoadingContainer";
import getAllCountries from "@/lib/countries/getAllCountries";
import InternalLinkButton from "../Buttons/InternalLinkButton";

const CountryFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getAllCountries();
        if (response.error) throw new Error(response.message);
        setCountries(response.data || []);
      } catch (error: any) {
        console.error(`Get all countries error: ${error.message}.`);
        setCountries([]);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <LoadingContainer />
        ) : (
          <>
            {countries.length === 0 ? (
              <p>No countries to display.</p>
            ) : (
              <>
                {countries.map((country: Country, key: number) => (
                  <InternalLinkButton key={key} content={country.displayName} link={`/countries/${country._id}`} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountryFeed;
