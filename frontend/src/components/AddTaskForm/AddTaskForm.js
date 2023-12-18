import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
    const [newTask, setNewTask] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            addTask(newTask);
            setNewTask('');
        }
    };

    return (
        <div className="task-list-container">
            <h1>Task Tracker</h1>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="New task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            <ul>
                {/* Your task list items */}
            </ul>
        </div>

    );
};

export default AddTaskForm;