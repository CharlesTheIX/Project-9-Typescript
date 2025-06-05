"use client";
import TableCore from "./Table/Core";
import { useState, useEffect } from "react";
import LoadingContainer from "@/components/LoadingContainer";
import getAllCountries from "@/lib/countries/getAllCountries";
import { table_headers, table_storage_token } from "@/data/countriesTableData";
import getCountriesByContinent from "@/lib/countries/getCountriesByContinent";
import { getLocalStorageItem, removeLocalStorageItem } from "@/lib/storage/localStorage";

const CountriesTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continent, setContinent] = useState<Continent | "all" | null>(null);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(table_headers);
  const [formPreferences, setFormPreferences] = useState<FormPreferences | null>(null);

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
    const formPreferences = getLocalStorageItem(table_storage_token);
    if (formPreferences) {
      try {
        const newTablesHeaders: any = tableHeaders;
        const formPreferencesJSON: FormPreferences = JSON.parse(formPreferences);
        formPreferencesJSON.hide?.forEach((item: string) => {
          if (newTablesHeaders[item]) newTablesHeaders[item].hidden = true;
        });
        setTableHeaders(newTablesHeaders);
      } catch (error: any) {
        removeLocalStorageItem(table_storage_token);
      }
    }
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
        <TableCore
          data={countries}
          pagination={true}
          collection="countries"
          headers={tableHeaders}
          formPreferences={formPreferences}
          setFormPreferences={setFormPreferences}
        />
      )}
    </div>
  );
};

export default CountriesTable;
