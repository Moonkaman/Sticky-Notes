import React from "react";

import StickyNote from "../StickyNote/StickyNote";

const StickyBoard = props => {
  return (
    <div className="sticky-board-resize">
      <div className="sticky-board">
        <StickyNote />
      </div>
    </div>
  );
};

export default StickyBoard;
