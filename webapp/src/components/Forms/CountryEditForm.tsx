"use client";
import * as gbl from "@/globals";
import { useRef, useState } from "react";
import UrlInput from "../Inputs/UrlInput";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import NumberInput from "../Inputs/NumberInput";
import LoadingContainer from "../LoadingContainer";
import TextareaInput from "../Inputs/TextareaInput";
import MultiTextInput from "../Inputs/MultiTextInput";
import RectangleInput from "../Inputs/RectangleInput";
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
      const description: string = formData.get("description")?.toString() || "";
      const displayName: string = formData.get("display-name")?.toString() || "";
      const capitalCity: string = formData.get("capital-city")?.toString() || "";
      const names: string[] = JSON.parse(formData.get("names")?.toString() || "[]");
      const population: number = parseInt(formData.get("population")?.toString() || "0");
      const languages: string[] = JSON.parse(formData.get("languages")?.toString() || "[]");
      const continent = JSON.parse(formData.get("continent")?.toString() || `${gbl.nullOption}`).value as Continent;
      const mapRectangle: Rectangle = JSON.parse(formData.get("map-rectangle")?.toString() || `${gbl.nullRectangle}`);
      const flagRectangle: Rectangle = JSON.parse(formData.get("flag-rectangle")?.toString() || `${gbl.nullRectangle}`);

      const requestData: Country = {
        names,
        imageUrl,
        continent,
        languages,
        population,
        displayName,
        description,
        capitalCity,
        mapRectangle,
        flagRectangle,
      };

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
            <MultiTextInput name="languages" label="Languages" defaultValue={country.languages} />
            <NumberInput name="population" label="Population" min={0} defaultValue={`${country.population}`} />
            <TextInput name="capital-city" label="Capital City" defaultValue={country.capitalCity} />
            <TextareaInput name="description" label="Description" defaultValue={country.description} />
            <UrlInput name="image-url" label="Image Url" defaultValue={country.imageUrl} />
            <RectangleInput name="flag-rectangle" label="Flag Rectangle" defaultValue={country.flagRectangle} />
            <RectangleInput name="map-rectangle" label="Map Rectangle" defaultValue={country.mapRectangle} />
          </div>

          <div>
            <input
              type="submit"
              content="Submit"
              disabled={isLoading}
              className={`button w-auto ${isLoading ? "disabled" : ""}`}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CountryEditForm;
