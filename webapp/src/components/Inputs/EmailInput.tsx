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

const EmailInput: React.FC<Props> = (props: Props) => {
  const { required = false, name, label, className = "", defaultValue = "", onInput = () => {} } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input ${className} gap-2 flex flex-col text-left`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        name={name} 
        type="email"
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

export default EmailInput;
