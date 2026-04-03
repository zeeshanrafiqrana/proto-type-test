import React from "react";
import Canvas from "./Canvas";
import ConfigPanel from "./ConfigPanel";
import "./Builder.css";

export default function Builder({
  inputs,
  textComponents,
  selectedId,
  selectedComponent,
  onSelectComponent,
  onUpdateTextComponent,
  onAddTextComponent,
  onDeleteTextComponent,
}) {
  return (
    <div className="builder-layout">
      <div className="canvas-area">
        <div className="canvas-header">
          <span>Canvas</span>
          <button className="add-btn" onClick={onAddTextComponent}>
            + Add Text
          </button>
        </div>
        <Canvas
          inputs={inputs}
          textComponents={textComponents}
          selectedId={selectedId}
          onSelect={onSelectComponent}
        />
      </div>
      <div className="panel-area">
        {selectedComponent ? (
          <ConfigPanel
            component={selectedComponent}
            inputs={inputs}
            onUpdate={(updates) => onUpdateTextComponent(selectedId, updates)}
            onDelete={() => onDeleteTextComponent(selectedId)}
            onClose={() => onSelectComponent(null)}
          />
        ) : (
          <div className="empty-panel">
            <div className="empty-icon">&#9998;</div>
            <div className="empty-text">Click a text component to configure it</div>
          </div>
        )}
      </div>
    </div>
  );
}
