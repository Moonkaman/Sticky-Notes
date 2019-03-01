import React, { useState } from "react";
import Draggable from "react-draggable";

const StickyNote = props => {
  const [position, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("lightgreen");

  const handleDrag = (e, ui) => {
    setPos({
      x: ui.x,
      y: ui.y
    });
  };

  const testFunc = (e, ui) => {
    console.log(position);
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      grid={[5, 5]}
      bounds=".sticky-board"
      onStop={testFunc}
    >
      <div className="sticky-note" style={{ background: color }}>
        <h4 className="title">Test</h4>
        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
          debitis est perferendis commodi ratione, quia quidem minima sit cumque
          magni praesentium?
        </p>
      </div>
    </Draggable>
  );
};

export default StickyNote;
