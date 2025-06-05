import { SortOrder } from "mongoose";

export default (query: any): { [key: string]:SortOrder } => {
  const sort: { [key: string]: SortOrder } = {};

  try {
    const fields: string = query?.sort;
    if (fields) {
      fields.split(",").forEach((field: string) => {
        field = field.trim();
        sort[field.trim()] = field.startsWith("-") ? -1 : 1;
      });
    }
    return sort;
  } catch (error: any) {
    return sort;
  }
};
