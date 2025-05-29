"use client";
import Edit_SVG from "../SVGs/Edit_SVG";
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
  const [rowCount, setRowCount] = useState<number>(0);
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
        const bodyItems = countries.map((item: any) => {
          const returnItem: any = {};
          headItems.map((key: string) => {
            try {
              returnItem[key] = item[key];
            } catch (error: any) {
              returnItem[key] = null;
            }
          });
          return returnItem;
        });

        setHeadItems(headItems);
        setBodyItems(bodyItems);
        setRowCount(userRole === "admin" ? headItems.length + 1 : headItems.length);
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
        <div className="loading-container">
        <LoadingContainer />
        </div>
      ) : (
        <div className="scrollbar-x">
          {!countries || countries.length === 0 ? (
            <p>No data to display</p>
          ) : (
            <>
              <ul className="head" style={{ gridTemplateColumns: `repeat(${rowCount}, auto)` }}>
                {userRole === "admin" && (
                  <li className="edit">
                    <p>Edit</p>
                  </li>
                )}

                {headItems.map((item: string) => {
                  return (
                    <li key={item} className={`flex flex-row gap-2 items-center justify-between ${item}`}>
                      <p>{item}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="body">
                {bodyItems.map((item: any, key: number) => {
                  return (
                    <ul key={key} style={{ gridTemplateColumns: `repeat(${rowCount}, auto)` }}>
                      {userRole === "admin" && (
                        <li className="edit">
                          <Edit_SVG />
                        </li>
                      )}

                      {Object.keys(item).map((key: any) => {
                        return (
                          <li key={key} className={key}>
                            <p>{JSON.stringify(item[key])}</p>
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
