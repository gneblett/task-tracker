import React, { useState, useEffect } from 'react';
import Group from './Group/Group';

const Board = ({ title }) => {
    console.log('Board Component Name:', title);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

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
            <h2>{title}</h2>
            <div>
                {groups && groups.map((group) => (
                    <Group key={group.id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default Board;
