import React from 'react';

import './Task.css';

const Task = ({ task, isLast }) => {
  return (
    <div className={`task ${isLast ? 'last-task' : ''}`}>
      <div>{task.title}</div>
      <div>{task.priority}</div>
      <div>{task.status}</div>
    </div>
  );
};
export default Task;