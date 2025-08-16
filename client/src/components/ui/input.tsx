import React from 'react';

interface Props {
  value: string;
  setValue: (value: string) => void;
  classname: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({ value, setValue, classname, onKeyDown }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <input
      onKeyDown={onKeyDown}
      className={classname}
      type="text" 
      value={value} 
      onChange={handleChange} 
    />
  );
};