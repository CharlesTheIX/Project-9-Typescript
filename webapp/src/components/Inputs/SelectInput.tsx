"use client";
import * as gbl from "@/globals";
import { useState } from "react";
import Chevron_SVG from "@/SVGs/Chevron_SVG";
import { useBrowserContext } from "@/contexts/browserContext";

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
  const {
    name,
    label,
    options,
    className = "",
    required = false,
    onChange = () => {},
    defaultValue = gbl.nullOption
  } = props;
  const { browser } = useBrowserContext();
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<Option>(defaultValue);

  return (
    <div className={`input select-input ${className} ${active ? "active" : ""}`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} required={required} />

      {label && <label htmlFor={`${name}-select`}>{label}</label>}

      <div className="relative outline-none appearance-none overflow-hidden">
        <button
          type="button"
          className="px-5 py-2 w-full outline-none cursor-pointer text-left appearance-none"
          onClick={() => {
            if (browser === "safari") return setActive(!active);
          }}
          onFocus={() => {
            if (!active) setActive(true);
          }}
          onBlur={() => {
            if (active) setActive(false);
          }}
        >
          {value.label || "Select an option"}

          <Chevron_SVG direction="down" />
        </button>

        <ul className="scrollbar-y relative">
          {options.map((option: Option, key: number) => {
            return (
              <li
                key={key}
                className="px-5 py-2 cursor-pointer"
                onClick={() => {
                  const targetOption = options[key];
                  setActive(false);
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
