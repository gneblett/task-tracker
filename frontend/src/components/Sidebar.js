import React from 'react';
import AddBoard from './AddBoard';

import './Sidebar.css';

const Sidebar = ({ boards, selectedBoard, onSelectBoard, onAddBoard }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Boards</h2>
        <AddBoard onAddBoard={onAddBoard} />
      </div>
      
      {boards.map((board) => (
        <div
          key={board.id}
          onClick={() => onSelectBoard(board)}
          className={`sidebar-item ${board.title === selectedBoard ? 'selected' : 'unselected'}`}>
          {board.title}
        </div>
      ))}
    </div>
  );
};
export default Sidebar;