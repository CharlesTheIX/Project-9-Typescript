"use client";
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
import updateCountryById from "@/lib/countries/updateCountryById";
import { continentOptions, nullOption, nullRectangle } from "@/globals";
import validateCountryCreation from "@/lib/forms/validateCountryCreation";

type Props = {
  country: Country;
  callback: (...props: any) => void;
};

const CountryEditForm: React.FC<Props> = (props: Props) => {
  const { country, callback } = props;
  const toast = useToastContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      if (!country?._id) throw new Error("Country _id could not be found.");

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
      const continent = JSON.parse(formData.get("continent")?.toString() || `${nullOption}`).value as Continent;
      const mapRectangle: Rectangle = JSON.parse(formData.get("map-rectangle")?.toString() || `${nullRectangle}`);
      const flagRectangle: Rectangle = JSON.parse(formData.get("flag-rectangle")?.toString() || `${nullRectangle}`);

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

      const response = await updateCountryById({ _id: country?._id, update: requestData, options: {} });
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
    <FormCore ref={formRef} isLoading={isLoading} handleSubmit={handleSubmit}>
      <>
        <TextInput
          required={true}
          className="w-full"
          name="display-name"
          label="Display Name"
          defaultValue={country?.displayName}
        />
        <MultiTextInput name="names" label="Names" required={true} className="w-full" defaultValue={country?.names} />
        <SelectInput
          required={true}
          name="continent"
          label="Continent"
          className="w-full"
          options={continentOptions}
          defaultValue={continentOptions.find((option: Option) => option.value === country?.continent)}
        />
        <MultiTextInput className="w-full" name="languages" label="Languages" defaultValue={country?.languages} />
        <NumberInput
          min={0}
          name="population"
          className="w-full"
          label="Population"
          defaultValue={`${country?.population}`}
        />
        <TextInput className="w-full" name="capital-city" label="Capital City" defaultValue={country?.capitalCity} />
        <TextareaInput className="w-full" name="description" label="Description" defaultValue={country?.description} />
        <UrlInput className="w-full" name="image-url" label="Image Url" defaultValue={country?.imageUrl} />
        <RectangleInput
          className="w-full"
          name="flag-rectangle"
          label="Flag Rectangle"
          defaultValue={country?.flagRectangle}
        />
        <RectangleInput
          className="w-full"
          name="map-rectangle"
          label="Map Rectangle"
          defaultValue={country?.mapRectangle}
        />
      </>
    </FormCore>
  );
};

export default CountryEditForm;
