import React, { FormEvent } from "react";
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
    resetForm,
  } = useForm(formSchema);

  if (!formSchema.fields) {
    return <div>Invalid schema provided</div>;
  }

  const { fields } = formSchema;

  // This function could be a prop as well
  const handleSubmit = (event: FormEvent<unknown>) => {
    event.preventDefault();
    let query = "New query received:\n\n";
    Object.entries(formFields).map(([key, value]) => {
      if (value !== null) {
        if (fields[key].type === "select") {
          query +=
            fields[key].label +
            ": " +
            fields[key].options[value].value +
            "\n\n";
        } else {
          query += fields[key].label + ": " + value + "\n\n";
        }
      }
    });
    console.log(query);
    resetForm();
  };

  return (
    <div>
      <div className="bg-blue-600 p-4 text-white">
        <h1 className="font-extrabold text-xl">{title}</h1>
        {subtitle ? <h2 className="font-bold text-lg">{subtitle}</h2> : null}
      </div>
      <form
        onSubmit={handleSubmit}
        id="dynamic-form"
        className="px-10 py-4 bg-neutral-100 rounded text-[#071138]"
      >
        <div>
          {fields.map((field) => {
            const isActiveInput =
              !field.trigger ||
              field.trigger?.triggerFieldValues?.some(
                (fieldValue: unknown) =>
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
        <div className="flex justify-center">
          <button
            className={`py-1 px-8 text-white rounded mt-8 ${
              isValid ? "bg-[#143BB6] " : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
