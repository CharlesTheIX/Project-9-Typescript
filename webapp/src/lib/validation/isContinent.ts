import { continents } from "@/globals";

export default (value: any): boolean => {
  var response: boolean = true;

  try {
    if (typeof value !== "string") response = false;
    if (!continents.includes(value)) response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
