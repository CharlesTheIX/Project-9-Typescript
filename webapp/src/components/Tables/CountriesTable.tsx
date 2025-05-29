"use client";
import { useState, useEffect } from "react";
import LoadingContainer from "../LoadingContainer";
import { useUserContext } from "@/contexts/userContext";
import getAllCountries from "@/functions/countries/getAllCountries";
import getCountriesByContinent from "@/functions/countries/getCountriesByContinent";

type Props = {
  excludeKeys: string[];
};

const CountriesTable: React.FC<Props> = (props: Props) => {
  const { excludeKeys } = props;
  const { userRole } = useUserContext();
  const [bodyItems, setBodyItems] = useState<any[]>([]);
  const [headItems, setHeadItems] = useState<string[]>([]);
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

      const countries = response.data || [];
      if (countries.length > 0) {
        const headItems = Object.keys(countries[0]).filter((key: string) => !excludeKeys.includes(key));
        const bodyItems = countries.map((item: Country) => {
          const returnItem: any = {};
          headItems.map((key: string) => {
            try {
              // @ts-ignore
              returnItem[key] = item[key];
            } catch (error: any) {
              returnItem[key] = null;
            }
          });
          return returnItem;
        });

        setHeadItems(headItems);
        setBodyItems(bodyItems);
      }

      setContinent(item);
      setIsLoading(false);
      setCountries(response.data || []);
    } catch (error: any) {
      console.error(error);
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
    <div id="countries-table" className="table">
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <div className="scrollbar-x">
          {!countries || countries.length === 0 ? (
            <p>No data to display</p>
          ) : (
            <>
              <ul className="head flex flex-row items-center justify-between min-w-full">
                { userRole === "admin" && (
                  <li>
                    <p>Edit</p>
                  </li>
                ) }
                {headItems.map((item: string, key: number) => {
                  return (
                    <li key={key} className="flex flex-row gap-2 items-center justify-between">
                      <p>{item}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="body">
                {bodyItems.map((item: Country, key: number) => {
                  return (
                    <ul key={key}>
                      {Object.values(item).map((value: any, key: number) => {
                        return (
                          <li key={key}>
                            <p>{JSON.stringify(value)}</p>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CountriesTable;
