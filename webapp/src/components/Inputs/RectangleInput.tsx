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
    <div className={`input ${className} gap-5 flex flex-col`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} />

      {label && <label htmlFor={`${name}-input-x`}>{label}</label>}

      <div className="flex flex-row gap-2 all-width-100">
        <div className="flex flex-col all-width-100">
          <p className="text-xs">X</p>
          <input
            step="1"
            type="number"
            name={`${name}-input-x`}
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

        <div className="flex flex-col all-width-100">
          <p className="text-xs">Y</p>
          <input
            step="1"
            type="number"
            name={`${name}-input-y`}
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

        <div className="flex flex-col all-width-100">
          <p className="text-xs">Width</p>
          <input
            step="1"
            type="number"
            name={`${name}-input-width`}
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

        <div className="flex flex-col all-width-100">
          <p className="text-xs">Height</p>
          <input
            step="1"
            type="number"
            name={`${name}-input-height`}
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
