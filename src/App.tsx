import React from "react";
import DynamicForm from "./components/Form";
import sample from "./data/sample.json";

export function App() {
  const { title, subtitle } = sample.meta;
  const handleSubmit = () => {
    alert("Form submitted");
  };
  return (
    <div>
      <DynamicForm
        onSubmit={handleSubmit}
        title={title}
        subtitle={subtitle}
        formSchema={sample.data}
      />
    </div>
  );
}
