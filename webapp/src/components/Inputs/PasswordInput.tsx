"use client";
import { useState } from "react";
import Eye_SVG from "@/SVGs/Eye_SVG";
import EyeSlash_SVG from "@/SVGs/EyeSlash_SVG copy";

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
  const {
    name,
    label,
    className = "",
    required = false,
    defaultValue = "",
    onInput = () => {},
    includeConfirmation = false,
  } = props;
  const [value, setValue] = useState<string>(defaultValue);
  const [type, setType] = useState<"password" | "text">("password");
  const [confirmationValue, setConfirmationValue] = useState<string>(defaultValue);

  return (
    <div className={`input password-input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="gap-5 flex flex-col">
        <div className="relative w-full">
          <input
            type={type}
            name={name}
            value={value}
            required={required}
            className="px-5 py-2 outline-none appearance-none w-full"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue(target.value);
              onInput(target);
            }}
          />

          <div
            className="top-3 right-5 cursor-pointer absolute"
            onClick={() => {
              setType((prevValue: "password" | "text") => {
                return prevValue === "password" ? "text" : "password";
              });
            }}
          >
            {type === "password" ? (
              <Eye_SVG primaryColor={"inherit"} width={24} height={24} />
            ) : (
              <EyeSlash_SVG primaryColor={undefined} width={24} height={24} />
            )}
          </div>
        </div>

        {includeConfirmation && (
          <div className="gap-2 w-full flex flex-col">
            {label && <label htmlFor={name}>{label} Confirmation</label>}

            <div className="relative w-full">
              <input
                type={type}
                required={required}
                value={confirmationValue}
                name={`${name}-confirmation`}
                className="px-5 py-2 outline-none appearance-none w-full"
                onInput={(event: any) => {
                  const target = event.currentTarget || event.target;
                  setConfirmationValue(target.value);
                }}
              />

              <div
                className="top-3 right-5 cursor-pointer absolute"
                onClick={() => {
                  setType((prevValue: "password" | "text") => {
                    return prevValue === "password" ? "text" : "password";
                  });
                }}
              >
                {type === "password" ? (
                  <Eye_SVG primaryColor={undefined} width={24} height={24} />
                ) : (
                  <EyeSlash_SVG primaryColor={undefined} width={24} height={24} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
