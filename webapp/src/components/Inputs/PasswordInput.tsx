"use client";
import { useState } from "react";
import Eye_SVG from "../SVGs/Eye_SVG";
import EyeSlash_SVG from "../SVGs/EyeSlash_SVG copy";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  includeConfirmation?: boolean;
  onInput?: (event: any) => void;
};

const PasswordInput: React.FC<Props> = (props: Props) => {
  const { name, label, className = "", required = false, defaultValue = "", onInput = () => {}, includeConfirmation = false } = props;
  const [value, setValue] = useState<string>(defaultValue);
  const [type, setType] = useState<"password" | "text">("password");
  const [confirmationValue, setConfirmationValue] = useState<string>(defaultValue);

  return (
    <>
      <div className={`input ${className} all-width-100`}>
        {label && <label htmlFor={name}>{label}</label>}

        <div className="all-width-100  flex flex-col gap-5">
          <div className="relative">
            <input
              type={type}
              name={name}
              value={value}
              className="w-full"
              required={required}
              onInput={(event: any) => {
                const target = event.currentTarget || event.target;
                setValue(target.value);
                onInput(target);
              }}
            />

            <div
              className="absolute top-3 right-5 cursor-pointer"
              onClick={() => {
                setType((prevValue: "password" | "text") => {
                  return prevValue === "password" ? "text" : "password";
                });
              }}
            >
              {type === "password" ? <Eye_SVG primaryColor={"inherit"} width={24} height={24} /> : <EyeSlash_SVG primaryColor={undefined} width={24} height={24} />}
            </div>
          </div>
        </div>
      </div>

      {includeConfirmation && (
        <div className={`input ${className}-confirmation all-width-100`}>
          {label && <label htmlFor={name}>{label} Confirmation</label>}

          <div className="all-width-100  flex flex-col gap-5">
            <div className="relative">
              <input
                type={type}
                className="w-full"
                required={required}
                value={confirmationValue}
                name={`${name}-confirmation`}
                onInput={(event: any) => {
                  const target = event.currentTarget || event.target;
                  setConfirmationValue(target.value);
                }}
              />

              <div
                className="absolute top-3 right-5 cursor-pointer"
                onClick={() => {
                  setType((prevValue: "password" | "text") => {
                    return prevValue === "password" ? "text" : "password";
                  });
                }}
              >
                {type === "password" ? <Eye_SVG primaryColor={undefined} width={24} height={24} /> : <EyeSlash_SVG primaryColor={undefined} width={24} height={24} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordInput;
