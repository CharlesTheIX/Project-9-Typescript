"use client";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  defaultValue?: string[];
  defaultCurrentValue?: string;
  onInput?: (event: any) => void;
  onAdd?: (value: string) => void;
  onRemove?: (value: string) => void;
};

const MultiTextInput: React.FC<Props> = (props: Props) => {
  const {
    name,
    label = "",
    className = "",
    onAdd = () => {},
    required = false,
    defaultValue = [],
    onInput = () => {},
    onRemove = () => {},
    defaultCurrentValue = "",
  } = props;
  const [values, setValues] = useState<string[]>(defaultValue);
  const [currentValue, setCurrentValue] = useState<string>(defaultCurrentValue);

  return (
    <div className={`input multi-text-input ${className}`}>
      <input type="hidden" value={JSON.stringify(values)} name={name} required={required} />

      {label && <label htmlFor={`${name}-current`}>{label}</label>}

      <div className="input-container">
        <input
          type="text"
          value={currentValue}
          name={`${name}-current`}
          onInput={(event: any) => {
            const target = event.currentTarget || event.target;
            setCurrentValue(target.value);
            onInput(target);
          }}
        />

        <button
          type="button"
          className="button"
          onClick={() => {
            const valueExists = values.find((item: string) => item === currentValue);
            if (!currentValue || valueExists) return;
            setValues((prevValue: string[]) => [...prevValue, currentValue]);
            onAdd(currentValue);
            setCurrentValue("");
          }}
        >
          Add
        </button>
      </div>

      <div className="value-container">
        {values.map((value: string, key: number) => {
          return (
            <button
              key={key}
              type="button"
              className="button"
              onClick={() => {
                onRemove(value);
                setValues((prevValue: string[]) => {
                  return prevValue.filter((item: string) => item !== value);
                });
              }}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultiTextInput;
