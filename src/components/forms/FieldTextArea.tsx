import React from 'react';

import WrapperField, {
  WrapperFieldPassThroughProps,
} from '@/components/forms/WrapperField';

type FieldTextAreaProps = WrapperFieldPassThroughProps & {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | undefined;
  required?: boolean;
};

const FieldTextArea = ({
  label,
  name,
  onChange,
  value,
  required = false,
}: FieldTextAreaProps) => {
  return (
    <WrapperField name={`textarea-${name}`} label={label}>
      <textarea
        id={`textarea-${name}`}
        name={name}
        className='h-24 grow resize-none rounded-md border-black/10'
        onChange={onChange}
        value={value}
        required={required}
      />
    </WrapperField>
  );
};

export default FieldTextArea;
