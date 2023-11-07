import React from 'react';

import WrapperField, {
  WrapperFieldPassThroughProps,
} from '@/components/forms/WrapperField';

type FieldNumberInputProps = WrapperFieldPassThroughProps & {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | undefined;
  required?: boolean;
};

const FieldNumberInput = ({
  label,
  name,
  onChange,
  value,
  required = false,
}: FieldNumberInputProps) => {
  return (
    <WrapperField name={`input-${name}`} label={label}>
      <input
        id={`input-${name}`}
        name={name}
        type='number'
        className='grow rounded-md border-black/10'
        onChange={onChange}
        value={Number(value)}
        required={required}
      />
    </WrapperField>
  );
};

export default FieldNumberInput;
