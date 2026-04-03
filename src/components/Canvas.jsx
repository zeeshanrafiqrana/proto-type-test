import React from "react";
import Chip from "./Chip";
import "./Canvas.css";

export default function Canvas({ inputs, textComponents, selectedId, onSelect }) {
  const getInputLabel = (inputId) => {
    const input = inputs.find((i) => i.id === inputId);
    return input ? input.label : inputId;
  };

  const renderSegments = (segments) => {
    return segments.map((seg, i) => {
      if (seg.type === "text") {
        return <span key={i}>{seg.value}</span>;
      }
      return <Chip key={i} label={getInputLabel(seg.inputId)} transform={seg.transform} />;
    });
  };

  const getConditionLabel = (condition) => {
    if (!condition) return null;
    const label = getInputLabel(condition.inputId);
    return `Visible when "${label}" ${condition.operator}`;
  };

  return (
    <div className="canvas-container">
      <div className="canvas-section">
        <div className="canvas-section-label">Input Fields</div>
        {inputs.map((input) => (
          <div className="input-preview" key={input.id}>
            <label className="input-label">{input.label}</label>
            <input
              className="input-field"
              placeholder={`Enter ${input.label.toLowerCase()}...`}
              disabled
            />
          </div>
        ))}
      </div>

      <div className="canvas-section">
        <div className="canvas-section-label">Text Components</div>
        {textComponents.map((tc) => (
          <div
            key={tc.id}
            className={`text-card ${tc.id === selectedId ? "text-card--selected" : ""}`}
            onClick={() => onSelect(tc.id)}
          >
            <div className="text-card-header">
              <div className="text-card-label">{tc.label}</div>
              {tc.condition && <span className="condition-tag">{getConditionLabel(tc.condition)}</span>}
            </div>
            <div className="text-card-content">{renderSegments(tc.segments)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
