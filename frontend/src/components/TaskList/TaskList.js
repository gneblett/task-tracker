import React from 'react';
import './TaskList.css';

import { FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, handleDeleteTask }) => (
    <ul>
        {tasks.map((task) => (
            <li key={task.id}>
                <div className="trash-can" onClick={() => { handleDeleteTask(task.id); }}>
                    <FaTrash />
                </div>
                {task.title}
            </li>
        ))}
    </ul>
);

export default TaskList;