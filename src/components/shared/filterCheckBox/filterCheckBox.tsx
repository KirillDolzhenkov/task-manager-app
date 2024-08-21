import React from 'react';

import { Checkbox } from '@/components/ui/checkBox/checkBox';

interface Props {
  checked?: boolean;
  endAdornment?: React.ReactNode;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  text: string;
  value: string;
}

export const FilterCheckBox = (props: Props) => {
  const { checked, endAdornment, name, onCheckedChange, text, value } = props;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        className="size-6 rounded-[8px]"
        id={`checkbox-${String(name)}-${String(value)}`}
        onCheckedChange={onCheckedChange}
        value={value}
      />
      <label className="flex-1 cursor-pointer leading-none" htmlFor={`checkbox-${String(name)}-${String(value)}`}>
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
