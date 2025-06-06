"use client";
import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
  name: string;
  step?: number;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  onInput?: (event: any) => void;
};

const NumberInput: React.FC<Props> = (props: Props) => {
  const {
    max,
    name,
    label,
    min = 0,
    step = 1,
    className = "",
    required = false,
    defaultValue = "",
    onInput = () => {},
  } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`input number-input ${className} gap-2 flex flex-col text-left w-full`}>
      {label && (
        <label htmlFor={name} className="font-bold">
          {label}
        </label>
      )}

      <input
        min={min}
        max={max}
        name={name}
        step={step}
        type="number"
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

export default NumberInput;
