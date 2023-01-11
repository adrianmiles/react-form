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
    <div>
      <div className="bg-blue-600 p-4 text-white">
        <h1 className="font-extrabold text-xl">{title}</h1>
        {subtitle ? <h2 className="font-bold text-lg">{subtitle}</h2> : null}
      </div>
      <form
        onSubmit={onSubmit}
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
