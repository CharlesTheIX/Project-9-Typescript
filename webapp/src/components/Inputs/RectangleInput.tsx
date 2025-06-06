"use client";
import * as gbl from "@/globals";
import { useState } from "react";

type Props = {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: Rectangle;
};

const RectangleInput: React.FC<Props> = (props: Props) => {
  const { name, label = "", className = "", defaultValue = gbl.nullRectangle } = props;
  const [value, setValue] = useState<Rectangle>(defaultValue);

  return (
    <div className={`input rectangle-input ${className} gap-2 flex flex-col text-left w-full`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} />

      {label && (
        <label htmlFor={`${name}-input-x`} className="font-bold">
          {label}
        </label>
      )}

      <div className="gap-2 flex flex-row">
        <div className="w-full flex flex-col">
          <p className="text-xs w-full">X</p>
          <input
            step="1"
            type="number"
            value={value.x}
            name={`${name}-input-x`}
            className="px-5 py-2 outline-none appearance-none w-full"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue((prevValue: Rectangle) => {
                return {
                  ...prevValue,
                  x: parseInt(target.value),
                };
              });
            }}
          />
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs w-full">Y</p>
          <input
            step="1"
            type="number"
            value={value.y}
            name={`${name}-input-y`}
            className="px-5 py-2 outline-none appearance-none w-full"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue((prevValue: Rectangle) => {
                return {
                  ...prevValue,
                  y: parseInt(target.value),
                };
              });
            }}
          />
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs w-full">Width</p>
          <input
            step="1"
            type="number"
            value={value.width}
            name={`${name}-input-width`}
            className="px-5 py-2 outline-none appearance-none w-full"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue((prevValue: Rectangle) => {
                return {
                  ...prevValue,
                  width: parseInt(target.value),
                };
              });
            }}
          />
        </div>

        <div className="w-full flex flex-col">
          <p className="text-xs w-full">Height</p>
          <input
            step="1"
            type="number"
            value={value.height}
            name={`${name}-input-height`}
            className="px-5 py-2 outline-none appearance-none w-full"
            onInput={(event: any) => {
              const target = event.currentTarget || event.target;
              setValue((prevValue: Rectangle) => {
                return {
                  ...prevValue,
                  height: parseInt(target.value),
                };
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RectangleInput;
