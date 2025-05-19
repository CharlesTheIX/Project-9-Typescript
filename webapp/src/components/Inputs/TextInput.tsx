'use client';

import { useState } from 'react';

type Props = {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: string;
  onInput?: (event: any) => void;
};

const TextInput: React.FC<Props> = (props: Props) => {
  const { name, label, className = '', defaultValue = '', onInput = () => {} } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={`${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        value={value}
        onInput={(event: any) => {
          const target = event.currentTarget || event.target;
          setValue(target.value);
          onInput(target);
        }}
      />
    </div>
  );
};

export default TextInput;
