"use client";
import TableCore from "./Table/Core";
import { useState, useEffect } from "react";
import getAllUsers from "@/functions/users/getAllUsers";
import LoadingContainer from "@/components/LoadingContainer";
import { table_headers, table_storage_token } from "@/data/usersTableData";
import { getLocalStorageItem, removeLocalStorageItem } from "@/functions/storage/localStorage";

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableHeaders, setTableHeaders] = useState<TableHeader[]>(table_headers);
  const [formPreferences, setFormPreferences] = useState<FormPreferences | null>(null);

  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      var response: ApiResponse = await getAllUsers(200);
      if (response.error) throw new Error(response.message);
      setIsLoading(false);
      setUsers(response.data || []);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (users.length > 0) return;
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
      await fetchUsers();
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
          data={users}
          pagination={true}
          collection={"users"}
          headers={tableHeaders}
          formPreferences={formPreferences}
          setFormPreferences={setFormPreferences}
        />
      )}
    </div>
  );
};

export default UsersTable;
