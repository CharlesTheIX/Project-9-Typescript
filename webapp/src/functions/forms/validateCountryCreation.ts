import isUrl from "../validation/isUrl";
import isName from "../validation/isName";
import isNumber from "../validation/isNumber";
import isContinent from "../validation/isContinent";
import isRectangle from "../validation/isRectangle";
import isArrayOfStrings from "../validation/isArrayOfStrings";
import updateFormErrorMessage from "./updateFormErrorMessage";

export default (requestData: Country): FormError => {
  const formError: FormError = { error: false, message: "" };

  Object.keys(requestData).map((item: string) => {
    switch (item) {
      case "displayName":
        if (!isName(requestData[item], 4)) {
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
      // case "description":
      // if (requestData[item] && !isAlphanumeric(requestData[item], 5)) {
      // formError.error = true;
      // formError.message = updateFormErrorMessage(formError.message, "Description");
      // }
      // break;
      case "capitalCity":
        if (requestData[item] && !isName(requestData[item], 3)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Capital City");
        }
        break;
      case "languages":
        if (requestData[item] && requestData[item].length > 0 && !isArrayOfStrings(requestData[item], 1)) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Languages");
        }
        break;
      case "population":
        if (requestData[item] && !isNumber(requestData[item], "int")) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Population");
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
        if (requestData[item] && !isUrl(requestData[item], "external")) {
          formError.error = true;
          formError.message = updateFormErrorMessage(formError.message, "Image URL");
        }
        break;
    }
  });

  return formError;
};
