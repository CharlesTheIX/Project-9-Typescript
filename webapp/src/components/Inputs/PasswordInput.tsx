"use client";

import { useState } from "react";

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
    includeConfirmation = false
  } = props;
  const [value, setValue] = useState<string>(defaultValue);
  const [type, setType] = useState<"password" | "text">("password");
  const [confirmationValue, setConfirmationValue] = useState<string>(defaultValue);

  return (
    <div className={`${className} flex flex-col gap-2 text-left`}>
      {label && <label htmlFor={name}>{label}</label>}

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

      {includeConfirmation && (
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
      )}

      <p
        onClick={() => {
          setType((prevValue: "password" | "text") => {
            return prevValue === "password" ? "text" : "password";
          });
        }}
      >
        {type === "password" ? "Show" : "Hide"} password.
      </p>
    </div>
  );
};

export default PasswordInput;
