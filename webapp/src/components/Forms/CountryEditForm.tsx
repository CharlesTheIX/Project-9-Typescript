"use client";
import * as gbl from "@/globals";
import { useRef, useState } from "react";
import UrlInput from "../Inputs/UrlInput";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import MultiTextInput from "../Inputs/MultiTextInput";
import RectangleInput from "../Inputs/RectangleInput";
import LoadingContainer from "../Misc/LoadingContainer";
import { useThemeContext } from "@/contexts/themeContext";
import { useToastContext } from "@/contexts/toastContext";
import updateCountryById from "@/functions/countries/updateCountryById";
import validateCountryCreation from "@/functions/forms/validateCountryCreation";

type Props = {
  country: Country;
  callback: (...props: any) => void;
};

const CountryEditForm: React.FC<Props> = (props: Props) => {
  const { country, callback } = props;
  const toast = useToastContext();
  const { theme } = useThemeContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      if (!country._id) throw new Error("Country _id could not be found.");

      const form = formRef.current;
      if (!form) throw new Error("Form does not exist.");

      const formData = new FormData(form);
      const imageUrl: string = formData.get("image-url")?.toString() || "";
      const displayName: string = formData.get("display-name")?.toString() || "";
      const names: string[] = JSON.parse(formData.get("names")?.toString() || "[]");
      const continent = JSON.parse(formData.get("continent")?.toString() || `${gbl.nullOption}`).value as Continent;
      const mapRectangle: Rectangle = JSON.parse(formData.get("map-rectangle")?.toString() || `${gbl.nullRectangle}`);
      const flagRectangle: Rectangle = JSON.parse(formData.get("flag-rectangle")?.toString() || `${gbl.nullRectangle}`);
      const requestData: Country = { names, imageUrl, continent, displayName, mapRectangle, flagRectangle };

      const hasErrors = validateCountryCreation(requestData);
      if (hasErrors.error) throw new Error(`Invalid ${hasErrors.message}`);

      const response = await updateCountryById({ _id: country._id, update: requestData });
      if (response.error) throw new Error(response.message);

      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Country Updated");
      callback(response.data);
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Country Update Failed");
    }
  };

  return (
    <div className={`form ${theme}`}>
      <form ref={formRef} onSubmit={handleSubmit} className={`max-w-xl`}>
        <div>
          <div>
            {isLoading && (
              <div className={`form-loading-container`}>
                <LoadingContainer />
              </div>
            )}

            <TextInput name="display-name" label="Display Name" required={true} defaultValue={country.displayName} />
            <MultiTextInput name="names" label="Names" required={true} defaultValue={country.names} />
            <SelectInput
              required={true}
              name="continent"
              label="Continent"
              options={gbl.continentOptions}
              defaultValue={gbl.continentOptions.find((option: Option) => option.value === country.continent)}
            />
            <RectangleInput name="flag-rectangle" label="Flag Rectangle" defaultValue={country.flagRectangle} />
            <RectangleInput name="map-rectangle" label="Map Rectangle" defaultValue={country.mapRectangle} />
            <UrlInput name="image-url" label="Image Url" defaultValue={country.imageUrl} />
          </div>

          <div>
            <input className={`button w-auto ${isLoading ? "disabled" : ""}`} type="submit" content="Submit" disabled={isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CountryEditForm;
