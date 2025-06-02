"use client";
import Link from "next/link";
import Image from "next/image";
import * as gbl from "@/globals";
import { useState, useEffect } from "react";
import SelectInput from "../Inputs/SelectInput";
import LoadingContainer from "../LoadingContainer";
import getAllCountries from "@/functions/countries/getAllCountries";
import getCountriesByContinent from "@/functions/countries/getCountriesByContinent";

const CountryFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<Continent | "all" | null>(null);

  const fetchCountries = async (item: Continent | "all"): Promise<void> => {
    if (item === continent) return;
    setIsLoading(true);

    try {
      var response: ApiResponse;

      if (item === "all") {
        response = await getAllCountries(200);
      } else {
        response = await getCountriesByContinent({ continent: item, limit: 200 });
      }

      if (response.error) throw new Error(response.message);
      setCountries(response.data || []);
      setContinent(item);
      setIsLoading(false);
    } catch (error: any) {
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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 items-start">
        <div className="w-full flex flex-row gap-5 items-start max-h-[78px] overflow-visible z-1">
          <SelectInput
            label="Continent"
            name="continent-select"
            className="min-w-[250px]"
            onChange={fetchCountries}
            defaultValue={{ value: "all", label: "All" }}
            options={[{ value: "all", label: "All" }, ...gbl.continentOptions]}
          />
        </div>

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
                    <div className="card country-card" key={key}>
                      <Link key={key} href={`/countries/${country._id}`} />

                      <div>
                        <div>
                          <p className="title">{country.displayName}</p>

                          <div className="image-container">
                            <Image
                              width={40}
                              height={30}
                              alt={`${country.displayName} flag`}
                              src={
                                country.imageUrl
                                  ? country.imageUrl
                                      .replace("http://localhost:3000", "")
                                      .replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
                                  : "/assets/images/default-flag.webp"
                              }
                            />
                          </div>
                        </div>

                        <p className="content">{country.description}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryFeed;
