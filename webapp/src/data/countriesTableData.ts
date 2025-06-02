export const table_storage_token = `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}_COUNTRIES_FORM_PREFERENCES`;
export const table_headers: TableHeader[] = [
  {
    label: "Edit",
    value: "",
    dataType: "edit",
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
    value: "displayName",
    label: "Display Name"
  },
  {
    canSort: true,
    canCopy: true,
    value: "continent",
    label: "Continent"
  },
  {
    canCopy: true,
    canSort: true,
    value: "capitalCity",
    label: "Capital City"
  },
  {
    canSort: true,
    canCopy: true,
    value: "population",
    label: "Population"
  },
  {
    canCopy: true,
    value: "imageUrl",
    label: "Image URL"
  },
  {
    value: "names",
    label: "Names"
  }
];
