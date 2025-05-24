"use client";
import Link from "next/link";
import * as gbl from "@/globals";
import { useState, useEffect } from "react";
import LoadingContainer from "../Misc/LoadingContainer";
import FunctionalButton from "../Buttons/FunctionalButton";
import getAllCountries from "@/lib/countries/getAllCountries";
import getCountriesByContinent from "@/lib/countries/getCountriesByContinent";

const CountryFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<Continent | "all" | null>(null);

  const fetchCountries = async (item: Continent | "all"): Promise<void> => {
    if (item === continent) return;
    setIsLoading(true);

    try {
      var response: ApiResponse = item === "all" ? await getAllCountries(200) : await getCountriesByContinent({ continent: item, limit: 200 });
      if (response.error) throw new Error(response.message);
      setCountries(response.data || []);
      setContinent(item);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (continent) return;
    (async () => {
      await fetchCountries("all");
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 items-center">
          <ul className="flex flex-row gap-5 items-center">
            <FunctionalButton
              className={continent === "all" ? "active" : ""}
              callback={async () => {
                await fetchCountries("all");
              }}
            >
              All
            </FunctionalButton>

            {gbl.continents.map((item: Continent, key: number) => {
              return (
                <FunctionalButton
                  key={key}
                  className={continent === item ? "active" : ""}
                  callback={async () => {
                    await fetchCountries(item);
                  }}
                >
                  {item}
                </FunctionalButton>
              );
            })}
          </ul>

          <div className="flex flex-row flex-wrap gap-5 items-center">
            {isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                {countries.length === 0 ? (
                  <p>No countries to display.</p>
                ) : (
                  <>
                    {countries.map((country: Country, key: number) => (
                      <Link key={key} href={`/countries/${country._id}`}>
                        {country.displayName}
                      </Link>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryFeed;
