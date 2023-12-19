import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';


function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch boards from the Flask backend when the component mounts
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch('http://localhost:5000/boards');
      const data = await response.json();
      setBoards(data.boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      {boards.map((board) => (
        <Board key={board.id} title={board.title} />
      ))}
    </div>
  );
}

export default App;