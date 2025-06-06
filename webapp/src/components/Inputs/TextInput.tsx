"use client";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  onInput?: (event: any) => void;
};

const TextInput: React.FC<Props> = (props: Props) => {
  const { required = false, name, label, className = "", defaultValue = "", onInput = () => {} } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input text-input ${className} gap-2 flex flex-col text-left w-full`}>
      {label && (
        <label htmlFor={name} className="font-bold">
          {label}
        </label>
      )}

      <input
        type="text"
        name={name}
        value={value}
        required={required}
        className="px-5 py-2 outline-none appearance-none"
        onInput={(event: any) => {
          const target = event.currentTarget || event.target;
          setValue(target.value);
          onInput(target);
        }}
      />
    </div>
  );
};

export default TextInput;
