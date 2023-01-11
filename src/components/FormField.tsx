import React, { ChangeEvent } from "react";
import { Field } from "../types/Field";
import { FormFieldType } from "../types/FormFieldType";

import Select from "./Select";

type FormFieldProps = {
  formField: Field;
  onChange: (e: React.ChangeEvent<any>) => void;
  value: any;
};

const FormField = ({ value, onChange, formField }: FormFieldProps) => {
  const generateFieldInput = () => {
    switch (formField.type as FormFieldType) {
      case "input":
        return (
          <input
            type={formField["format"]}
            onChange={onChange}
            value={value || ""}
            id={formField.id}
            className="w-full h-10 p-2"
          />
        );
      case "select":
        return (
          <Select
            onChange={onChange}
            value={value}
            id={formField.id}
            options={formField["options"]}
          />
        );
      case "textarea":
        return (
          <textarea
            className="w-full p-2"
            id={formField.id}
            onChange={onChange}
            value={value || ""}
          />
        );
      default:
        return <div>Error loading field</div>;
    }
  };

  return (
    <div>
      <div className="my-2 font-light">{formField.label}</div>
      <div>{generateFieldInput()}</div>
    </div>
  );
};

export default FormField;
