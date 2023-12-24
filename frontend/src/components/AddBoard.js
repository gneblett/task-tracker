import React, { useState } from 'react';
import AddButton from './AddButton';

import "./AddBoard.css"

const AddBoard = ({ onAddBoard }) => {
    const [newBoardTitle, setNewBoardTitle] = useState('');

    const handleAddBoard = () => {
        if (newBoardTitle.trim() !== '') {
            onAddBoard(newBoardTitle);
            setNewBoardTitle('');
        }
    };

    return (
        <div className="add-board">
            <input
                className="add-board-input"
                type="text"
                placeholder="Enter board title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
            />
        <AddButton onClick={handleAddBoard}/>
        </div >
    );
};
export default AddBoard;