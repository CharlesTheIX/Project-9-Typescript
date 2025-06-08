import { userProfileTypes } from "@/globals";

export default (value: any): boolean => {
  var response: boolean = true;

  try {
    if (typeof value !== "string") response = false;
    if (!userProfileTypes.includes(value)) response = false;
    return response;
  } catch (error: any) {
    return false;
  }
};
