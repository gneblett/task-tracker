import React from 'react';

import './Sidebar.css';

const Sidebar = ({ boards, selectedBoard, onSelectBoard }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Boards</h2>
      </div>
      {boards.map((board) => (
        <div
          key={board.id}
          onClick={() => onSelectBoard(board)}
          className={`sidebar-item ${board.title === selectedBoard ? 'selected' : ''}`}
        >
          {board.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;