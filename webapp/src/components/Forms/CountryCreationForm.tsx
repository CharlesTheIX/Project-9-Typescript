"use client";
import * as gbl from "@/globals";
import { useRef, useState } from "react";
import UrlInput from "../Inputs/UrlInput";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import MultiTextInput from "../Inputs/MultiTextInput";
import RectangleInput from "../Inputs/RectangleInput";
import LoadingContainer from "../Misc/LoadingContainer";
import { useToastContext } from "@/contexts/toastContext";
import { useThemeContext } from "@/contexts/themeContext";
import createCountry from "@/functions/countries/createCountry";
import validateCountryCreation from "@/functions/forms/validateCountryCreation";

const nullCountry: Country = {
  names: [],
  imageUrl: "",
  displayName: "",
  continent: "" as Continent,
  mapRectangle: gbl.nullRectangle,
  flagRectangle: gbl.nullRectangle,
};

const CountryCreationForm: React.FC = () => {
  const toast = useToastContext();
  const { theme } = useThemeContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<Country>(nullCountry);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event?.preventDefault();
    setIsLoading(true);

    try {
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

      const response = await createCountry(requestData);
      if (response.error) throw new Error(response.message);

      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Country Created");
      setDefaultValues((prevValue: Country) => {
        const newValue = { ...prevValue, nullCountry };
        return newValue;
      });
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Country Creation Failed");
    }
  };

  return (
    <div className={`form ${theme} ${isLoading ? "loading" : ""}`}>
      <form ref={formRef} onSubmit={handleSubmit} className={`max-w-xl`}>
        <div>
          <div>
            {isLoading && (
              <div className={`form-loading-container`}>
                <LoadingContainer />
              </div>
            )}

            <TextInput name="display-name" label="Display Name" required={true} defaultValue={defaultValues.displayName} />
            <MultiTextInput name="names" label="Names" required={true} defaultValue={defaultValues.names} defaultCurrentValue={defaultValues.displayName} />
            <SelectInput
              required={true}
              name="continent"
              label="Continent"
              options={gbl.continentOptions}
              defaultValue={{ value: defaultValues.continent, label: defaultValues.continent }}
            />
            <RectangleInput name="flag-rectangle" label="Flag Rectangle" defaultValue={defaultValues.flagRectangle} />
            <RectangleInput name="map-rectangle" label="Map Rectangle" defaultValue={defaultValues.mapRectangle} />
            <UrlInput name="image-url" label="Image Url" defaultValue={defaultValues.imageUrl} />
          </div>

          <div>
            <input className={`button ${isLoading ? "disabled" : ""}`} type="submit" content={isLoading ? "Loading" : "Submit"} disabled={isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CountryCreationForm;
