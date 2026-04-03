import React, { useState, useCallback } from "react";
import Builder from "./components/Builder";
import Preview from "./components/Preview";
import "./App.css";

const DEFAULT_INPUTS = [
  { id: "firstName", label: "First Name", value: "" },
  { id: "age", label: "Age", value: "" },
];

const DEFAULT_TEXT_COMPONENTS = [
  {
    id: "greeting",
    label: "Greeting",
    segments: [
      { type: "text", value: "Hello, " },
      { type: "reference", inputId: "firstName", transform: "none" },
      { type: "text", value: "!" },
    ],
    condition: null,
  },
  {
    id: "ageMessage",
    label: "Age Message",
    segments: [
      { type: "text", value: "You are " },
      { type: "reference", inputId: "age", transform: "none" },
      { type: "text", value: " years old." },
    ],
    condition: { inputId: "age", operator: "is not empty" },
  },
  {
    id: "fullIntro",
    label: "Full Intro",
    segments: [
      { type: "text", value: "Meet " },
      { type: "reference", inputId: "firstName", transform: "uppercase" },
      { type: "text", value: ", age " },
      { type: "reference", inputId: "age", transform: "none" },
    ],
    condition: null,
  },
];

export default function App() {
  const [mode, setMode] = useState("build");
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [textComponents, setTextComponents] = useState(DEFAULT_TEXT_COMPONENTS);
  const [selectedId, setSelectedId] = useState(null);

  const updateInput = useCallback((id, value) => {
    setInputs((prev) => prev.map((inp) => (inp.id === id ? { ...inp, value } : inp)));
  }, []);

  const updateTextComponent = useCallback((id, updates) => {
    setTextComponents((prev) =>
      prev.map((tc) => (tc.id === id ? { ...tc, ...updates } : tc)),
    );
  }, []);

  const addTextComponent = useCallback(() => {
    const newId = `text_${Date.now()}`;
    setTextComponents((prev) => [
      ...prev,
      {
        id: newId,
        label: "New Text",
        segments: [{ type: "text", value: "Click to configure..." }],
        condition: null,
      },
    ]);
    setSelectedId(newId);
  }, []);

  const deleteTextComponent = useCallback((id) => {
    setTextComponents((prev) => prev.filter((tc) => tc.id !== id));
    setSelectedId(null);
  }, []);

  const selectedComponent = textComponents.find((tc) => tc.id === selectedId);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">Proto</div>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "build" ? "mode-btn--active" : ""}`}
            onClick={() => setMode("build")}
          >
            Build
          </button>
          <button
            className={`mode-btn ${mode === "preview" ? "mode-btn--active" : ""}`}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>
      </header>

      {mode === "build" ? (
        <Builder
          inputs={inputs}
          textComponents={textComponents}
          selectedId={selectedId}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedId}
          onUpdateTextComponent={updateTextComponent}
          onAddTextComponent={addTextComponent}
          onDeleteTextComponent={deleteTextComponent}
        />
      ) : (
        <Preview
          inputs={inputs}
          textComponents={textComponents}
          onUpdateInput={updateInput}
        />
      )}
    </div>
  );
}
