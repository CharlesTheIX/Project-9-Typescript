"use client";
import { useState, useEffect } from "react";
import LoadingContainer from "../LoadingContainer";
import TableCore, { TableHeader } from "./TableCore";
import getAllCountries from "@/functions/countries/getAllCountries";
import getCountriesByContinent from "@/functions/countries/getCountriesByContinent";

const CountriesTable: React.FC = () => {
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

  const tableHeaders: TableHeader[] = [
    {
      label: "Edit",
      value: "",
      dataType: "edit",
      roles: ["admin"],
    },
    {
      label: "_id",
      value: "_id",
      canCopy: true,
      roles: ["admin"],
    },
    {
      canSort: true,
      canCopy: true,
      value: "displayName",
      label: "Display Name",
    },
    {
      canSort: true,
      canCopy: true,
      value: "continent",
      label: "Continent",
    },
    {
      canCopy: true,
      canSort: true,
      value: "capitalCity",
      label: "Capital City",
    },
    {
      canSort: true,
      canCopy: true,
      value: "population",
      label: "Population",
    },
    {
      canCopy: true,
      value: "imageUrl",
      label: "Image URL",
    },
    {
      value: "names",
      label: "Names",
    },
  ];

  useEffect(() => {
    if (continent) return;
    (async () => {
      await fetchCountries("all");
    })();
  }, []);

  return (
    <div className="table">
      {isLoading ? (
        <div className="loading-container">
          <LoadingContainer />
        </div>
      ) : (
        <TableCore headers={tableHeaders} data={countries} />
      )}
    </div>
  );
};

export default CountriesTable;
