import React, { useState, useEffect } from "react";
import Group from "./Group";
import AddGroup from "./AddGroup";

import "./Board.css";

const Board = ({ title }) => {
  console.log("Board Component Name:", title);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch groups data when the component mounts and whenever the title changes
    fetchGroups();
  }, [title]); // Include title in the dependency array

  const fetchGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${title}/groups`
      );
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleAddGroup = async (newGroupTitle) => {
    console.log("Board Component Name in HandleAddGroup:", title);
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${title}/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newGroupTitle,
          }),
        }
      );

      if (response.ok) {
        fetchGroups(); // Refresh the list of groups and tasks
      } else {
        console.error("Error adding group:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleAddTask = async (groupTitle, newTaskTitle) => {
    try {
      const response = await fetch(
        `http://localhost:5000/boards/${title}/groups/${groupTitle}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTaskTitle,
            priority: "Low",
            status: "Pending",
          }),
        }
      );

      if (response.ok) {
        fetchGroups(); // Refresh the list of groups and tasks
      } else {
        console.error("Error adding task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="board-container">
      <h2 className="board-title">{title}</h2>
      <AddGroup onAddGroup={handleAddGroup} />
      <div>
        {groups &&
          groups.map((group) => (
            <Group key={group.id} group={group} onAddTask={handleAddTask} />
          ))}
      </div>
    </div>
  );
};

export default Board;
