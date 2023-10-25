import React from 'react';

import WrapperField, {
  WrapperFieldPassThroughProps,
} from '@/components/forms/WrapperField';

type FieldTextInputProps = WrapperFieldPassThroughProps & {
  name: string;
  type?: 'text' | 'password' | 'email';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  required?: boolean;
};

const FieldTextInput = ({
  label,
  name,
  type = 'text',
  onChange,
  value,
  required = false,
}: FieldTextInputProps) => {
  return (
    <WrapperField name={`input-${name}`} label={label}>
      <input
        id={`input-${name}`}
        name={name}
        type={type}
        className='grow rounded-md border-black/10'
        onChange={onChange}
        value={value}
        required={required}
      />
    </WrapperField>
  );
};

export default FieldTextInput;
