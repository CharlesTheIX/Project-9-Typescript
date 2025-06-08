"use client";
import TableCore from "../Table/Core";
import { useState, useEffect } from "react";
import getAllCountries from "@/lib/countries/getAllCountries";
import { countries_table_headers, countries_table_storage_token } from "./data";
import { getLocalStorageItem, removeLocalStorageItem } from "@/lib/storage/localStorage";

const CountriesTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<Continent | "all" | null>(null);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(countries_table_headers);
  const [formPreferences, setFormPreferences] = useState<FormPreferences | null>(null);

  const fetchCountries = async (item: Continent | "all"): Promise<void> => {
    if (item === continent) return;
    setIsLoading(true);
    try {
      var response: ApiResponse;
      if (item === "all") {
        response = await getAllCountries({ limit: 200 });
      } else {
        response = await getAllCountries({ limit: 200, and: "continent", andValue: item });
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
    const formPreferences = getLocalStorageItem(countries_table_storage_token);
    if (formPreferences) {
      try {
        const newTablesHeaders: any = tableHeaders;
        const formPreferencesJSON: FormPreferences = JSON.parse(formPreferences);
        formPreferencesJSON.hide?.forEach((item: string) => {
          if (newTablesHeaders[item]) newTablesHeaders[item].hidden = true;
        });
        setTableHeaders(newTablesHeaders);
      } catch (error: any) {
        removeLocalStorageItem(countries_table_storage_token);
      }
    }
    (async () => {
      await fetchCountries("all");
    })();
  }, []);

  return (
    <TableCore
      data={countries}
      pagination={true}
      isLoading={isLoading}
      collection="countries"
      headers={tableHeaders}
      formPreferences={formPreferences}
      setFormPreferences={setFormPreferences}
    />
  );
};

export default CountriesTable;
