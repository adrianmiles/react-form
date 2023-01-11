import { useEffect, useState } from "react";
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
      const { validation, id } = field;
      if (validation?.required && !fields[field.id]) {
        validCheck = false;
        return;
      }
    });
    setIsValid(validCheck);
  }, [fields]);

  function onChange(event: { target: { id: any; value: any } }) {
    setFields((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  }

  return { fields, onChange, isValid };
}
