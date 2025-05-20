"use client";

import * as gbl from "@/globals";
import { useRef, useState } from "react";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import Toast, { ToastProps } from "../Misc/Toast";
import MultiTextInput from "../Inputs/MultiTextInput";
import RectangleInput from "../Inputs/RectangleInput";
import LoadingContainer from "../Misc/LoadingContainer";
import FunctionalButton from "../Buttons/FunctionalButton";
import submitCountryCreationForm from "@/lib/forms/submitCountryCreationForm";

type Props = {
  className?: string;
};

const CountryCreationForm: React.FC<Props> = (props: Props) => {
  const { className = "" } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastProps>({ content: "", type: "error" });

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const form = formRef.current;

      if (!form) throw new Error("Form does not exist.");

      await submitCountryCreationForm({ form, errorCallback, successCallback });

      setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  const errorCallback = (): void => {
    setToastData({
      hidden: false,
      type: "error",
      title: "Country Creation Failed",
      content: "An error occured..."
    });
  };

  const successCallback = (): void => {
    formRef.current?.reset();
    setToastData({
      hidden: false,
      type: "success",
      title: "Country Created",
      content: "Country successfully added to the database."
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <div className={`${className} flex flex-col gap-5`}>
          <form ref={formRef} className={`max-w-5xl flex flex-col items-center justify-center mx-auto`}>
            <div className="flex flex-col gap-5 all-width-100 items-center w-full">
              <TextInput name="display-name" label="Display Name" />

              <MultiTextInput name="names" label="Names" />

              <SelectInput name="continent" label="Continent" options={gbl.continentOptions} />

              <RectangleInput name="flag-rectangle" label="Flag Rectangle" />

              <RectangleInput name="map-rectangle" label="Map Rectangle" />

              <TextInput name="image-url" label="Image Url" />
            </div>
          </form>

          <div>
            <FunctionalButton
              content="Submit"
              callback={async () => {
                await handleSubmit();
              }}
            />
          </div>
        </div>
      )}

      <Toast {...toastData} />
    </>
  );
};

export default CountryCreationForm;
