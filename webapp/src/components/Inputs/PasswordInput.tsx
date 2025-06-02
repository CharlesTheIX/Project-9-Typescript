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

      <div>
        <div className="password">
          <input
            type={type}
            name={name}
            value={value}
            required={required}
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue(target.value);
              onInput(target);
            }}
          />

          <div
            className="hide-show"
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
          <div className="password-confirmation">
            {label && <label htmlFor={name}>{label} Confirmation</label>}

            <div className="password">
              <input
                type={type}
                required={required}
                value={confirmationValue}
                name={`${name}-confirmation`}
                onInput={(event: any) => {
                  const target = event.currentTarget || event.target;
                  setConfirmationValue(target.value);
                }}
              />

              <div
                className="hide-show"
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
