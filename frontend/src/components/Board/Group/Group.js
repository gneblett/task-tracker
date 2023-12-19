import React from 'react';
import Task from './Task/Task';

const Group = ({ group }) => {
    return (
        <div className="group">
            <h3>{group.title}</h3>
            <ul>
                {group.tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default Group;