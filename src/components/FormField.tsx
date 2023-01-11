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
          <textarea id={formField.id} onChange={onChange} value={value || ""} />
        );
      default:
        return <div>Error loading field</div>;
    }
  };

  return (
    <div>
      <div>{formField.label}</div>
      <div>{generateFieldInput()}</div>
    </div>
  );
};

export default FormField;
