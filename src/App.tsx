import React from "react";
import DynamicForm from "./components/DynamicForm";
import sample from "./data/sample.json";

export function App() {
  const { title, subtitle } = sample.meta;
  const handleSubmit = () => {
    alert("Form submitted");
  };
  return (
    <div className="bg-[#EBF1FC] min-h-full flex justify-center">
      <div className="pt-10">
        <DynamicForm
          onSubmit={handleSubmit}
          title={title}
          subtitle={subtitle}
          formSchema={sample.data}
        />
      </div>
    </div>
  );
}
