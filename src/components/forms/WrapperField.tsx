import React from 'react';

export type WrapperFieldPassThroughProps = {
  label: string;
  name: string;
};

type WrapperFieldProps = WrapperFieldPassThroughProps & {
  children: React.ReactNode;
};

const WrapperField = ({ label, name, children }: WrapperFieldProps) => {
  return (
    <div className='flex gap-8'>
      <label htmlFor={name} className='w-1/4 text-sm font-semibold'>
        {label}
      </label>
      {children}
    </div>
  );
};

export default WrapperField;
