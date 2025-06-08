export const users_table_storage_token = `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}_USERS_FORM_PREFERENCES`;
export const users_table_headers: TableHeader[] = [
  {
    label: "Pin",
    value: "",
    dataType: "pin",
    roles: ["admin"],
  },
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
    roles: ["admin"],
  },
  {
    canSort: true,
    value: "profileType",
    label: "Profile Type",
    roles: ["admin"],
  },
  {
    value: "email",
    label: "email",
  },
];
