import { SortOrder } from "mongoose";

export type SortType = {
  [key: string]: SortOrder;
};
type Props = {
  query:any;
  defaultValue?: SortType;
};

export default (props: Props): SortType => {
  const {query, defaultValue = {}} = props;
  var sort: SortType = defaultValue;

  try {
    const fields: string = query?.sort;

    if (fields) {
      const customSort: SortType = {};
      fields.split(",").forEach((field: string) => {
        field = field.trim();
        if (field.startsWith("-")) {
          customSort[field.replace("-", "")] = -1;
        } else {
          customSort[field] = 1;
        }
      });
      sort = customSort;
    }

    return sort;
  } catch (error: any) {
    return sort;
  }
};
