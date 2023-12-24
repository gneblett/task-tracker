import React, { useState } from 'react';
import AddButton from './AddButton';


import "./AddTask.css"

const AddTask = ({ onAddTask, groupTitle }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            onAddTask(groupTitle, newTaskTitle);
            setNewTaskTitle('');
        }
    };

    return (
        <div className="add-task">
            <input
                className="add-task-input"
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <AddButton onClick={handleAddTask}/>
        </div>
    );
};
export default AddTask;