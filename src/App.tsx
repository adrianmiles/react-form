import React from "react";
import DynamicForm from "./components/DynamicForm";
import sample from "./data/sample.json";

export function App() {
  const { title, subtitle } = sample.meta;

  return (
    <div className="bg-[#EBF1FC] min-h-full flex justify-center">
      <div className="pt-10">
        <DynamicForm
          title={title}
          subtitle={subtitle}
          formSchema={sample.data}
        />
      </div>
    </div>
  );
}
