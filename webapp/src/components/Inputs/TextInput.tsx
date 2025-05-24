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
    <div className={`${className} flex flex-col gap-2 text-left`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        type="text"
        name={name}
        value={value}
        required={required}
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
