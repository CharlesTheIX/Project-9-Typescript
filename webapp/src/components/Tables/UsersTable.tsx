"use client";
import { useState, useEffect } from "react";
import LoadingContainer from "../LoadingContainer";
import TableCore, { TableHeader } from "./TableCore";
import getAllUsers from "@/functions/users/getAllUsers";

const UsersTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

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

  const tableHeaders: TableHeader[] = [
    {
      label: "Edit",
      value: "",
      dataType: "edit",
      roles: ["admin"],
    },
    {
      label: "Impersonate",
      value: "",
      dataType: "impersonate",
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
      value: "username",
      label: "Username",
    },
    {
      canSort: true,
      value: "role",
      label: "Role",
    },
    {
      value: "email",
      label: "email",
    },
  ];

  useEffect(() => {
    if (users.length > 0) return;
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
        <TableCore headers={tableHeaders} data={users} pagination={true} collection={"users"} />
      )}
    </div>
  );
};

export default UsersTable;
