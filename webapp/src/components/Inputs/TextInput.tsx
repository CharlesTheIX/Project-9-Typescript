"use client";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string;
  onInput?: (event: any) => void | boolean;
};

const TextInput: React.FC<Props> = (props: Props) => {
  const { required = false, name, label, defaultValue = "", onInput = () => {}, className = "" } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input text-input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type="text"
        name={name}
        value={value}
        required={required}
        onInput={(event: any) => {
          const target = event.currentTarget || event.target;
          setValue(target.value);
          const clearInput = onInput(target);
          if (!!clearInput) setValue("");
        }}
      />
    </div>
  );
};

export default TextInput;
