import * as gbl from "@/globals";
import createCountry from "../countries/createCountry";
import checkCountryCreationErrors from "./checkCountryCreationErrors";

type Props = {
  form: HTMLFormElement;
  errorCallback: () => void;
  successCallback: () => void;
};

export default async (props: Props): Promise<void> => {
  const { form, successCallback = () => {}, errorCallback = () => {} } = props;

  try {
    const formData = new FormData(form);
    const imageUrl: string = formData.get("image-url")?.toString() || "";
    const displayName: string = formData.get("display-name")?.toString() || "";
    const names: string[] = JSON.parse(formData.get("names")?.toString() || "[]");
    const mapRectangle: Rectangle = JSON.parse(formData.get("map-rectangle")?.toString() || `${gbl.nullRectangle}`);
    const flagRectangle: Rectangle = JSON.parse(formData.get("flag-rectangle")?.toString() || `${gbl.nullRectangle}`);
    const continent: Continent = JSON.parse(formData.get("continent")?.toString() || `${gbl.nullOption}`).value as Continent;
    const requestData: Country = {
      names,
      imageUrl,
      continent,
      displayName,
      mapRectangle,
      flagRectangle,
    };

    const hasErrors = checkCountryCreationErrors(requestData);
    if (hasErrors.error) throw new Error(hasErrors.message);

    const response = await createCountry(requestData);
    if (response.error) throw new Error(response.message);

    successCallback();
  } catch (error: any) {
    errorCallback();
  }
};
