import React from 'react';
import { MdAddBox } from 'react-icons/md';

import "./AddButton.css"

const AddButton = ({ onClick, size = 45, color = '#3b83ff' }) => {
    const buttonStyle = {
        fontSize: size,
        color: color,
    };

    return (
        <div className="add-button-container" onClick={onClick} style={buttonStyle} >
            <MdAddBox className="add-button-icon"/>
        </div>
    );
};

export default AddButton;