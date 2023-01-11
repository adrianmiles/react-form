import React, { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { FormSchema } from "../types/FormSchema";
import FormField from "./FormField";

type DynamicFormProps = {
  formSchema: FormSchema;
  title: string;
  subtitle?: string;
};

const DynamicForm = ({ title, subtitle, formSchema }: DynamicFormProps) => {
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
    <form>
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : null}
      <div>
        {fields.map((field) => {
          // we can play around with these triggers

          if (
            field?.trigger?.triggerFieldId &&
            field.trigger?.triggerFieldValues
          ) {
            const isTriggeredInput = field.trigger.triggerFieldValues.some(
              (fieldValue) =>
                fieldValue === formFields[field.trigger.triggerFieldId]
            );
            if (isTriggeredInput) {
              return (
                <FormField
                  onChange={handleOnChange}
                  value={formFields[field.id]}
                  formField={field}
                  key={field.id}
                />
              );
            }
          } else {
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
      {isValid.toString()}
      <div>
        <button disabled={!isValid} type="button">
          Submit
        </button>
        <span></span>
      </div>
      <div>Formfields {JSON.stringify(formFields)}</div>
    </form>
  );
};

export default DynamicForm;
