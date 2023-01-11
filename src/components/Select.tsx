import React, { ChangeEvent } from "react";
type SelectProps = {
  options: { id: string; value: string }[];
  onChange: (e: ChangeEvent) => void;
  value: string;
  id: string;
};
const Select = ({ options, onChange, value, id }: SelectProps) => {
  if (!options) {
    <div>Error rendering options: no options found</div>;
  }
  return (
    <select
      className="w-full h-10 p-2"
      onChange={onChange}
      value={value || ""}
      id={id}
    >
      <option value={""}>Please select an option</option>
      {options.map((option) => (
        <option key={option.id} id={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
