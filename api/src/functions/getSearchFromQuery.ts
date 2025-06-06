export type OrSearch = { [key: string]: { $regex: string; $options: any } }[];

const allSearchFields = ["-displayName"];

export default (query: any): OrSearch[] => {
  var search: any[] = [];

  try {
    const value: string = query?.value;
    if (!value) return search;

    var fields: string[] = allSearchFields;
    if (query?.search) fields = query?.search.split(",");

    search = fields.map((field: string) => {
      field = field.trim();
      const searchValue = { $regex: value, $options: "i" };
      return { [field]: searchValue };
    });

    return search;
  } catch (error: any) {
    return search;
  }
};
