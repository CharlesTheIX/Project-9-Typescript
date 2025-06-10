"use client";
import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
  name: string;
  step?: number;
  label?: string;
  className?: string;
  required?: boolean;
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
    <div className={`input number-input ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        min={min}
        max={max}
        name={name}
        step={step}
        type="number"
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

export default NumberInput;
