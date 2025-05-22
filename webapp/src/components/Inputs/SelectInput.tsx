"use client";

import * as gbl from "@/globals";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  options: Option[];
  required?: boolean;
  className?: string;
  defaultValue?: Option;
  onChange?: (event: any) => void;
};

const SelectInput: React.FC<Props> = (props: Props) => {
  const { name, label, required = false, options, className = "", onChange = () => {}, defaultValue = gbl.nullOption } = props;
  const [value, setValue] = useState<Option>(defaultValue);

  return (
    <div className={`${className} flex flex-col gap-2 text-left`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} required={required} />

      {label && <label htmlFor={`${name}-select`}>{label}</label>}

      <select
        value={value.value}
        name={`${name}-select`}
        onChange={(event: any) => {
          const target = event.currentTarget || event.target;
          const value = parseInt(target.value);
          const targetOption = options[value];
          setValue(targetOption);
          onChange(event);
        }}
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((option: Option, key: number) => {
          return (
            <option value={key} key={key}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
