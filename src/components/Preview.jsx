import React from "react";
import "./Preview.css";

function applyTransform(value, transform) {
  if (!value) return "";
  switch (transform) {
    case "uppercase":
      return value.toUpperCase();
    case "lowercase":
      return value.toLowerCase();
    case "titlecase":
      return value.replace(/\b\w/g, (c) => c.toUpperCase());
    default:
      return value;
  }
}

function evaluateCondition(condition, inputs) {
  if (!condition) return true;
  const input = inputs.find((i) => i.id === condition.inputId);
  const val = input ? input.value : "";

  switch (condition.operator) {
    case "is not empty":
      return val.trim().length > 0;
    case "is empty":
      return val.trim().length === 0;
    case "equals":
      return val === (condition.value || "");
    case "does not equal":
      return val !== (condition.value || "");
    case "contains":
      return val.includes(condition.value || "");
    default:
      return true;
  }
}

function renderPreviewText(segments, inputs) {
  return segments.map((seg, i) => {
    if (seg.type === "text") {
      return <span key={i}>{seg.value}</span>;
    }

    const input = inputs.find((inp) => inp.id === seg.inputId);
    const raw = input ? input.value : "";
    const display = applyTransform(raw, seg.transform);

    return (
      <span className={`live-value ${raw ? "live-value--has-value" : ""}`} key={i}>
        {display || `[${input ? input.label : seg.inputId}]`}
      </span>
    );
  });
}

export default function Preview({ inputs, textComponents, onUpdateInput }) {
  return (
    <div className="preview-container">
      <div className="preview-frame">
        <h2 className="preview-label">Live Preview</h2>
        <p className="preview-description">
          Type in the inputs below to see your dynamic text update in real time.
        </p>

        <div className="input-section">
          {inputs.map((input) => (
            <div className="input-group" key={input.id}>
              <label className="input-label">{input.label}</label>
              <input
                className="input-field"
                value={input.value}
                onChange={(e) => onUpdateInput(input.id, e.target.value)}
                placeholder={`Enter ${input.label.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>

        <div className="output-section">
          <div className="output-label">Output</div>
          {textComponents.map((tc) => {
            const visible = evaluateCondition(tc.condition, inputs);
            return (
              <div className={`text-output ${visible ? "" : "text-output--hidden"}`} key={tc.id}>
                <div className="text-output-label">{tc.label}</div>
                <div className="text-output-content">{renderPreviewText(tc.segments, inputs)}</div>
                {!visible && <div className="hidden-badge">Hidden — condition not met</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
