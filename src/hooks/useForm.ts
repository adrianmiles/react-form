import { useEffect, useState } from "react";
import { Field } from "../types/Field";
import { FormSchema } from "../types/FormSchema";

export function useForm(formSchema: FormSchema) {
  const [isValid, setIsValid] = useState(false);

  const [fields, setFields] = useState(
    formSchema.fields.reduce(function (result, item) {
      result[item.id] = null;
      return result;
    }, {})
  );

  useEffect(() => {
    const { fields: formFields } = formSchema;
    let validCheck = true;

    formFields.forEach((field) => {
      const { validation, trigger } = field;
      const isActiveInput =
        trigger?.triggerFieldValues.some(
          (fieldValue: Field) => fieldValue === fields[trigger?.triggerFieldId]
        ) || !trigger;

      if (validation?.required && !fields[field.id] && isActiveInput) {
        validCheck = false;
        return;
      }
    });
    setIsValid(validCheck);
  }, [fields, formSchema]);

  function onChange(event: { target: { id: string; value: string } }) {
    setFields((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  }

  return { fields, onChange, isValid };
}
