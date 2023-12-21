import React, { useState, useEffect } from 'react';
import Group from './Group';

import "./Board.css"

const Board = ({ title }) => {
  console.log('Board Component Name:', title);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch groups data when the component mounts and whenever the title changes
    fetchGroups();
  }, [title]); // Include title in the dependency array

  const fetchGroups = async () => {
    try {
      const response = await fetch(`http://localhost:5000/boards/${title}/groups`);
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  return (
    <div className="board-container">
      <h2 className="board-title">{title}</h2>
      <div>
        {groups && groups.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Board;