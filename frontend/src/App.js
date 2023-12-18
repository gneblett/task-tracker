import React, { useState, useEffect } from 'react';
import './App.css';

import { TaskList, AddTaskForm } from './components';

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // Fetch tasks from the Flask backend when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });
      const data = await response.json();

      // Update the tasks state with the new task
      setTasks([...tasks, data.task]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:5000/tasks?id=${taskId}`, {
        method: 'DELETE',
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Update the tasks state by filtering out the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error('Error deleting task:', errorData);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

return (
  <div className="App">
    <div>
      <AddTaskForm addTask={addTask} />
    </div>
    <div className="task-list-container">
      <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} />
    </div>
  </div>
);
}

export default App;

