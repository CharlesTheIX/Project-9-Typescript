
export type Search = { [key: string]: { $regex: string; $options: any } };
type Props = {
  query: any;
  defaultValue?: Search[];
  defaultFields?: string[];
};

export default (props: Props): Search[] => {
  const { query, defaultValue = [], defaultFields = []} = props;
  var search: Search[] = defaultValue;

  try {
    const value: string = query?.value;
    if (!value) return search;

    var fields: string[] = defaultFields;
    if (query?.search && query?.search !== "all")  fields = query?.search.split(",");

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
