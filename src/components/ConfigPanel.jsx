import React, { useState } from "react";
import Chip from "./Chip";
import "./ConfigPanel.css";

const OPERATORS = ["is not empty", "is empty", "equals", "does not equal", "contains"];

export default function ConfigPanel({ component, inputs, onUpdate, onDelete, onClose }) {
  const [conditionValue, setConditionValue] = useState(component.condition?.value || "");

  const getPrefixSpace = () => {
    if (!component.segments.length) return "";
    const lastSegment = component.segments[component.segments.length - 1];
    if (lastSegment.type !== "text") return " ";
    return /\s$/.test(lastSegment.value) ? "" : " ";
  };

  const handleLabelChange = (e) => {
    onUpdate({ label: e.target.value });
  };

  const handleAddReference = (inputId) => {
    const prefix = getPrefixSpace();
    const newSegments = [
      ...component.segments,
      ...(prefix ? [{ type: "text", value: prefix }] : []),
      { type: "reference", inputId, transform: "none" },
    ];
    onUpdate({ segments: newSegments });
  };

  const handleAddText = () => {
    const prefix = getPrefixSpace();
    const newSegments = [...component.segments, { type: "text", value: `${prefix}text here` }];
    onUpdate({ segments: newSegments });
  };

  const handleSegmentTextChange = (index, value) => {
    const newSegments = component.segments.map((seg, i) => (i === index ? { ...seg, value } : seg));
    onUpdate({ segments: newSegments });
  };

  const handleSegmentTransformChange = (index, transform) => {
    const newSegments = component.segments.map((seg, i) => (i === index ? { ...seg, transform } : seg));
    onUpdate({ segments: newSegments });
  };

  const handleRemoveSegment = (index) => {
    const newSegments = component.segments.filter((_, i) => i !== index);
    onUpdate({ segments: newSegments.length > 0 ? newSegments : [{ type: "text", value: "" }] });
  };

  const handleToggleCondition = () => {
    if (component.condition) {
      onUpdate({ condition: null });
    } else {
      onUpdate({ condition: { inputId: inputs[0].id, operator: "is not empty", value: "" } });
    }
  };

  const handleConditionInputChange = (inputId) => {
    onUpdate({ condition: { ...component.condition, inputId } });
  };

  const handleConditionOperatorChange = (operator) => {
    onUpdate({ condition: { ...component.condition, operator } });
  };

  const handleConditionValueChange = (value) => {
    setConditionValue(value);
    onUpdate({ condition: { ...component.condition, value } });
  };

  const getInputLabel = (inputId) => {
    const input = inputs.find((i) => i.id === inputId);
    return input ? input.label : inputId;
  };

  const needsValue =
    component.condition && !["is not empty", "is empty"].includes(component.condition.operator);

  return (
    <div className="config-panel">
      <div className="panel-header">
        <div className="panel-title">Configure Text</div>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="field">
        <label className="label">Component Name</label>
        <input className="input" value={component.label} onChange={handleLabelChange} />
      </div>

      <hr className="divider" />

      <div className="field">
        <label className="label">Content</label>
        <p className="help-text">
          Build your text by combining static words with dynamic values from inputs.
        </p>

        <div className="segment-list">
          {component.segments.map((seg, index) => (
            <div key={index}>
              {seg.type === "text" ? (
                <div className="segment-row">
                  <span className="text-icon">Aa</span>
                  <input
                    className="segment-input"
                    value={seg.value}
                    onChange={(e) => handleSegmentTextChange(index, e.target.value)}
                    placeholder="Type text..."
                  />
                  <button className="remove-btn" onClick={() => handleRemoveSegment(index)}>
                    &times;
                  </button>
                </div>
              ) : (
                <div className="segment-row">
                  <Chip
                    label={getInputLabel(seg.inputId)}
                    transform={seg.transform}
                    editable
                    onChangeTransform={(t) => handleSegmentTransformChange(index, t)}
                  />
                  <button className="remove-btn" onClick={() => handleRemoveSegment(index)}>
                    &times;
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="insert-row">
          <button className="insert-btn" onClick={handleAddText}>
            + Add text
          </button>
          <div className="insert-dropdown">
            <span className="insert-btn insert-btn--label">+ Insert value from...</span>
            <div className="dropdown-menu">
              {inputs.map((input) => (
                <button
                  key={input.id}
                  className="dropdown-item"
                  onClick={() => handleAddReference(input.id)}
                >
                  <span className="chip-dot" />
                  {input.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="field">
        <div className="condition-header">
          <label className="label label--no-margin">Conditional Visibility</label>
          <div
            className={`toggle ${component.condition ? "toggle--active" : ""}`}
            onClick={handleToggleCondition}
          >
            <div className={`toggle-thumb ${component.condition ? "toggle-thumb--active" : ""}`} />
          </div>
        </div>
        <p className="help-text">Show this component only when a condition is met.</p>

        {component.condition && (
          <div className="condition-config">
            <div className="condition-row">
              <span className="condition-label">Show when</span>
              <select
                className="select"
                value={component.condition.inputId}
                onChange={(e) => handleConditionInputChange(e.target.value)}
              >
                {inputs.map((input) => (
                  <option key={input.id} value={input.id}>
                    {input.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="condition-row">
              <select
                className="select"
                value={component.condition.operator}
                onChange={(e) => handleConditionOperatorChange(e.target.value)}
              >
                {OPERATORS.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            {needsValue && (
              <div className="condition-row">
                <input
                  className="input"
                  value={conditionValue}
                  onChange={(e) => handleConditionValueChange(e.target.value)}
                  placeholder="Value..."
                />
              </div>
            )}
          </div>
        )}
      </div>

      <hr className="divider" />

      <button className="delete-btn" onClick={onDelete}>
        Delete Component
      </button>
    </div>
  );
}
