import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

import "./App.css";

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    // Fetch boards from the Flask backend when the component mounts
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch("http://localhost:5000/boards");
      const data = await response.json();
      setBoards(data.boards);
      // Set the first board as the selected board initially
      setSelectedBoard(data.boards[0]?.title || null);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleAddBoard = async (newBoardTitle) => {
    try {
      const response = await fetch("http://localhost:5000/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newBoardTitle }),
      });

      if (response.ok) {
        fetchBoards(); // Refresh the list of boards
      } else {
        console.error("Error adding board:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board.title);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
      </header>
      <div className="app-content">
        <Sidebar
          className="sidebar"
          boards={boards}
          selectedBoard={selectedBoard}
          onSelectBoard={handleSelectBoard}
          onAddBoard={handleAddBoard}
        />
        <div className="main-content">
          <Board title={selectedBoard} />
        </div>
      </div>
    </div>
  );
}

export default App;
