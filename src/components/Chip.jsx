import React from "react";
import "./Chip.css";

const TRANSFORM_LABELS = {
  none: "As typed",
  uppercase: "UPPERCASE",
  lowercase: "lowercase",
  titlecase: "Title Case",
};

export default function Chip({
  label,
  transform = "none",
  onChangeTransform,
  editable = false,
}) {
  return (
    <span className="chip-wrapper">
      <span className="chip-pill">
        <span className="chip-icon">&#9670;</span>
        {label}
        {transform !== "none" && <span className="transform-badge">{TRANSFORM_LABELS[transform]}</span>}
      </span>
      {editable && (
        <select
          className="transform-select"
          value={transform}
          onChange={(e) => onChangeTransform(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(TRANSFORM_LABELS).map(([key, val]) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </select>
      )}
    </span>
  );
}
