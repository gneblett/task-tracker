import React, { useState } from "react";
import AddButton from "./AddButton";

import "./AddGroup.css";

const AddGroup = ({ onAddGroup }) => {
  const [newGroupTitle, setNewGroupTitle] = useState("");

  const handleAddGroup = () => {
    if (newGroupTitle.trim() !== "") {
      onAddGroup(newGroupTitle);
      setNewGroupTitle("");
    }
  };

  return (
    <div className="add-group">
      <input
        className="add-group-input"
        type="text"
        placeholder="Enter group title"
        value={newGroupTitle}
        onChange={(e) => setNewGroupTitle(e.target.value)}
      />
      <AddButton onClick={handleAddGroup} />
    </div>
  );
};
export default AddGroup;
