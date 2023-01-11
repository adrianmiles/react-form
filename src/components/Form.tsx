import React from "react";
import { useForm } from "../hooks/useForm";
import { FormSchema } from "../types/FormSchema";
import FormField from "./FormField";

type DynamicFormProps = {
  formSchema: FormSchema;
  title: string;
  subtitle?: string;
  onSubmit: () => void;
};

const DynamicForm = ({
  title,
  subtitle,
  formSchema,
  onSubmit,
}: DynamicFormProps) => {
  const {
    fields: formFields,
    onChange: handleOnChange,
    isValid,
  } = useForm(formSchema);

  if (!formSchema.fields) {
    return <div>Invalid schema provided</div>;
  }

  const { fields } = formSchema;
  return (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : null}
      <div>
        {fields.map((field) => {
          const isActiveInput =
            !field.trigger ||
            field.trigger?.triggerFieldValues?.some(
              (fieldValue: any) =>
                fieldValue === formFields[field.trigger?.triggerFieldId]
            );
          if (isActiveInput) {
            return (
              <FormField
                onChange={handleOnChange}
                value={formFields[field.id]}
                formField={field}
                key={field.id}
              />
            );
          }
        })}
      </div>
      <button disabled={!isValid}>Submit</button>
    </form>
  );
};

export default DynamicForm;
