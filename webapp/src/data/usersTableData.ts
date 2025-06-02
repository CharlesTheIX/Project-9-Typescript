export const table_storage_token = `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}_USERS_FORM_PREFERENCES`;
export const table_headers: TableHeader[] = [
  {
    label: "Edit",
    value: "",
    dataType: "edit",
    roles: ["admin"]
  },
  {
    label: "Impersonate",
    value: "",
    dataType: "impersonate",
    roles: ["admin"]
  },
  {
    label: "_id",
    value: "_id",
    canCopy: true,
    roles: ["admin"]
  },
  {
    canSort: true,
    canCopy: true,
    value: "username",
    label: "Username"
  },
  {
    canSort: true,
    value: "role",
    label: "Role"
  },
  {
    value: "email",
    label: "email"
  }
];