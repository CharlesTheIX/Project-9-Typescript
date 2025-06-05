"use client";
import * as gbl from "@/globals";
import FormCore from "./Form/Core";
import { useRef, useState } from "react";
import UrlInput from "@/Inputs/UrlInput";
import TextInput from "@/Inputs/TextInput";
import SelectInput from "@/Inputs/SelectInput";
import NumberInput from "@/Inputs/NumberInput";
import TextareaInput from "@/Inputs/TextareaInput";
import MultiTextInput from "@/Inputs/MultiTextInput";
import RectangleInput from "@/Inputs/RectangleInput";
import { useToastContext } from "@/contexts/toastContext";
import createCountry from "@/lib/countries/createCountry";
import validateCountryCreation from "@/lib/forms/validateCountryCreation";

const CountryCreationForm: React.FC = () => {
  const toast = useToastContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<Country>(gbl.nullCountry);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event?.preventDefault();
    setIsLoading(true);

    try {
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
        flagRectangle
      };

      const hasErrors = validateCountryCreation(requestData);
      if (hasErrors.error) throw new Error(`Invalid ${hasErrors.message}`);

      const response = await createCountry(requestData);
      if (response.error) throw new Error(response.message);

      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Country Created");
      setDefaultValues(gbl.nullCountry);
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Country Creation Failed");
    }
  };

  return (
    <FormCore ref={formRef} isLoading={isLoading} handleSubmit={handleSubmit}>
      <>
        <TextInput
          required={true}
          className="w-full"
          name="display-name"
          label="Display Name"
          defaultValue={defaultValues.displayName}
        />
        <MultiTextInput
          name="names"
          label="Names"
          required={true}
          className="w-full"
          defaultValue={defaultValues.names}
          defaultCurrentValue={defaultValues.displayName}
        />
        <SelectInput
          required={true}
          name="continent"
          label="Continent"
          className="w-full"
          options={gbl.continentOptions}
          defaultValue={{ value: defaultValues.continent, label: defaultValues.continent }}
        />
        <MultiTextInput
          name="languages"
          label="Languages"
          className="w-full"
          defaultValue={defaultValues.languages}
          defaultCurrentValue={defaultValues.displayName}
        />
        <NumberInput
          min={0}
          name="population"
          className="w-full"
          label="Population"
          defaultValue={`${defaultValues.population}`}
        />
        <TextInput
          className="w-full"
          name="capital-city"
          label="Capital City"
          defaultValue={defaultValues.capitalCity}
        />
        <TextareaInput
          className="w-full"
          name="description"
          label="Description"
          defaultValue={defaultValues.description}
        />
        <UrlInput name="image-url" label="Image Url" defaultValue={defaultValues.imageUrl} className="w-full" />
        <RectangleInput
          className="w-full"
          name="flag-rectangle"
          label="Flag Rectangle"
          defaultValue={defaultValues.flagRectangle}
        />
        <RectangleInput
          className="w-full"
          name="map-rectangle"
          label="Map Rectangle"
          defaultValue={defaultValues.mapRectangle}
        />
      </>
    </FormCore>
  );
};

export default CountryCreationForm;
