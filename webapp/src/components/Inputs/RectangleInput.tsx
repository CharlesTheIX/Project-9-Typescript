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
  const { name, label = "", defaultValue = gbl.nullRectangle, className = "" } = props;
  const [value, setValue] = useState<Rectangle>(defaultValue);

  return (
    <div className={`input rectangle-input ${className}`}>
      <input type="hidden" value={JSON.stringify(value)} name={name} />

      {label && <label htmlFor={`${name}-input-x`}>{label}</label>}

      <div className="input-container">
        <div>
          <p className="text-xs w-full">X</p>
          <input
            step="1"
            type="number"
            value={value.x}
            className="w-full"
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

        <div>
          <p>Y</p>
          <input
            step="1"
            type="number"
            value={value.y}
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

        <div>
          <p>Width</p>
          <input
            step="1"
            type="number"
            value={value.width}
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

        <div>
          <p>Height</p>
          <input
            step="1"
            type="number"
            value={value.height}
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
