"use client";
import { useState } from "react";
import FunctionalButton from "../Buttons/FunctionalButton";

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
  const { name, label = "", className = "", onAdd = () => {}, required = false, defaultValue = [], onInput = () => {}, onRemove = () => {}, defaultCurrentValue = "" } = props;
  const [values, setValues] = useState<string[]>(defaultValue);
  const [currentValue, setCurrentValue] = useState<string>(defaultCurrentValue);

  return (
    <div className={`input ${className}`}>
      <input type="hidden" value={JSON.stringify(values)} name={name} required={required} />

      {label && <label htmlFor={`${name}-current`}>{label}</label>}

      <div className="flex flex-row gap-2 justify-start w-full">
        <input
          type="text"
          className="w-full"
          value={currentValue}
          name={`${name}-current`}
          onInput={(event: any) => {
            const target = event.currentTarget || event.target;
            setCurrentValue(target.value);
            onInput(target);
          }}
        />

        <FunctionalButton
          callback={() => {
            const valueExists = values.find((item: string) => item === currentValue);

            if (!currentValue || valueExists) return;

            setValues((prevValue: string[]) => [...prevValue, currentValue]);
            onAdd(currentValue);
            setCurrentValue("");
          }}
        >
          Add
        </FunctionalButton>
      </div>

      <div className="flex flex-row flex-wrap gap-2 justify-start">
        {values.map((value: string, key: number) => {
          return (
            <FunctionalButton
              key={key}
              className="w-auto"
              callback={() => {
                onRemove(value);
                setValues((prevValue: string[]) => {
                  return prevValue.filter((item: string) => item !== value);
                });
              }}
            >
              {value}
            </FunctionalButton>
          );
        })}
      </div>
    </div>
  );
};

export default MultiTextInput;
