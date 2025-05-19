'use client';

import { useState } from 'react';
import FunctionalButton from '../Buttons/FunctionalButton';

type Props = {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: string[];
  defaultCurrentValue?: string;
  onInput?: (event: any) => void;
  onAdd?: (value: string) => void;
  onRemove?: (value: string) => void;
};

const MultiTextInput: React.FC<Props> = (props: Props) => {
  const { name, label = '', className = '', onAdd = () => {}, defaultValue = [], onInput = () => {}, onRemove = () => {}, defaultCurrentValue = '' } = props;
  const [values, setValues] = useState<string[]>(defaultValue);
  const [currentValue, setCurrentValue] = useState<string>(defaultCurrentValue);

  return (
    <div className={`${className}`}>
      <input type="hidden" value={JSON.stringify(values)} name={name} />

      {label && <label htmlFor={`${name}-current`}>{label}</label>}
      <div>
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

        <FunctionalButton
          content="Add"
          callback={() => {
            setValues((prevValue: string[]) => [...prevValue, currentValue]);
            onAdd(currentValue);
            setCurrentValue('');
          }}
        />
      </div>

      <div>
        {values.map((value: string) => {
          return (
            <FunctionalButton
              content={value}
              callback={() => {
                onRemove(value);
                setValues((prevValue: string[]) => {
                  return prevValue.filter((item: string) => item !== value);
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MultiTextInput;
