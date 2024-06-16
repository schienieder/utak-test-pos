import React from 'react';

interface IMyInput {
  label: string;
  type: string;
  name: string;
  value?: string | number | Date;
  required?: boolean;
  onChangeValue(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

const MyInput = ({
  label,
  type,
  name,
  value = '',
  required = true,
  onChangeValue,
  placeholder,
}: IMyInput) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={name} className="font-bold text-gray-800">
        {label}
        <span className="text-rose-500">{Boolean(required) ? '*' : ''}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value instanceof Date ? value.toISOString() : value}
        className="max-w-96 w-full bg-transparent border border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required={required}
        onChange={onChangeValue}
        placeholder={placeholder ?? ''}
      />
    </div>
  );
};

export default MyInput;
