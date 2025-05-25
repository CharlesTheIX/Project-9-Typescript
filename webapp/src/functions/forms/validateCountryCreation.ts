import isUrl from "../validation/isUrl";
import isContinent from "../validation/isContinent";
import isRectangle from "../validation/isRectangle";
import isAlphanumeric from "../validation/isAlphanumeric";
import isArrayOfStrings from "../validation/isArrayOfStrings";
import updateFormErrorMessage from "./updateFormErrorMessage";

export default (requestData: Country): FormError => {
  const formError: FormError = { error: false, message: "" };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "displayName":
        if (!isAlphanumeric(requestData[item], 5)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Display Name");
        }
        break;
      case "names":
        if (!isArrayOfStrings(requestData[item], 1)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Names");
        }
        break;
      case "continent":
        if (!isContinent(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Continent");
        }
        break;
      case "flagRectangle":
        if (!isRectangle(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Flag Rectangle");
        }
        break;
      case "mapRectangle":
        if (!isRectangle(requestData[item])) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Map Rectangle");
        }
        break;
      case "imageUrl":
        if (requestData[item] && !isUrl(requestData[item], "any")) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Image URL");
        }
        break;
    }
  });

  return formError;
};
