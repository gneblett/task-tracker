import React from 'react';
import Task from './Task';

import "./Group.css"

const Group = ({ group }) => {
    return (
        <div className="group">
            <h2 className="group-title">{group.title}</h2>
            <div className="column-container">
                <div className="columns">
                    <div className="column">Name</div>
                    <div className="column">Priority</div>
                    <div className="column">Status</div>
                </div>
                <ul>
                    {group.tasks.map((task, index) => (
                        <Task key={task.id} task={task} isLast={index === group.tasks.length - 1} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Group;