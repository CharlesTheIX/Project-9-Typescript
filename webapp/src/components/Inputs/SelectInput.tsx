"use client";
import * as gbl from "@/globals";
import { useState } from "react";
import Chevron_SVG from "../SVGs/Chevron_SVG";

type Props = {
  name: string;
  label?: string;
  options: Option[];
  required?: boolean;
  className?: string;
  defaultValue?: Option;
  onChange?: (value: any) => void;
};

const SelectInput: React.FC<Props> = (props: Props) => {
  const { name, label, required = false, options, className = "", onChange = () => {}, defaultValue = gbl.nullOption } = props;
  const [value, setValue] = useState<Option>(defaultValue);

  return (
    <div className={`input ${className}`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} required={required} />

      {label && <label htmlFor={`${name}-select`}>{label}</label>}

      <div className={`select-input relative`}>
        <button type="button">
          {value.label || "Select an option"}

          <Chevron_SVG direction="down" width={12} height={12} />
        </button>

        <ul className="scrollbar-y">
          {options.map((option: Option, key: number) => {
            return (
              <li
                key={key}
                onClick={() => {
                  const targetOption = options[key];
                  setValue(targetOption);
                  onChange(targetOption.value);
                }}
              >
                <span>{option.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectInput;
