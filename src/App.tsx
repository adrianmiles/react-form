import React from "react";
import DynamicForm from "./components/Form";
import sample from "./data/sample.json";

export function App() {
  const { title, subtitle } = sample.meta;
  return (
    <div>
      <DynamicForm title={title} subtitle={subtitle} formSchema={sample.data} />
    </div>
  );
}
