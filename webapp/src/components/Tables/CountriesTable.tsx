"use client";
import Link from "next/link";
import * as gbl from "@/globals";
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
        <div className="scrollbar-x inner">
          {!countries || countries.length === 0 ? (
            <p>No data to display</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {userRole === "admin" && <td>Edit</td>}

                  {Object.keys(gbl.nullCountry).map((item: string) => {
                    if (excludeKeys.includes(item)) return;
                    return <td key={item}>{item}</td>;
                  })}
                </tr>
              </thead>

              <tbody>
                {countries.map((item: any, key: number) => {
                  return (
                    <tr key={key}>
                      {userRole === "admin" && (
                        <td>
                          <Link href={`/countries/edit/${item._id}`}>
                            <Edit_SVG />
                          </Link>
                        </td>
                      )}

                      {Object.keys(gbl.nullCountry).map((i: string, key: number) => {
                        if (excludeKeys.includes(i)) return;
                        if (!item[i]) return <td key={key}>N/A</td>;

                        return <td key={key}>{item[i]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CountriesTable;
