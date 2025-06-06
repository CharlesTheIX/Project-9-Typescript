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
    <div className={`input multi-text-input${className} gap-2 flex flex-col text-left w-full`}>
      <input type="hidden" value={JSON.stringify(values)} name={name} required={required} />

      {label && (
        <label htmlFor={`${name}-current`} className="font-bold">
          {label}
        </label>
      )}

      <div className="gap-2 w-full flex flex-row justify-start">
        <input
          type="text"
          value={currentValue}
          name={`${name}-current`}
          className="px-5 py-2 outline-none appearance-none w-full"
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

      <div className="values gap-2 w-full flex wrap flex-row justify-start">
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
