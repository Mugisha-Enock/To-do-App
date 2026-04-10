import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add a new task
  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App min-vh-100 bg-light">
      <div className="container py-5">
        <h1 className="text-center mb-4 text-primary">🎯 To-Do List</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Input Form */}
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Add a new task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
              />
              <button className="btn btn-success btn-lg" onClick={addTask}>
                Add
              </button>
            </div>

            {/* Task List */}
            <ul className="list-group">
              {tasks.length === 0 ? (
                <li className="list-group-item text-center text-muted">
                  No tasks yet. Add one!
                </li>
              ) : (
                tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      task.completed ? "bg-success bg-opacity-10" : ""
                    }`}
                  >
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "green" : "black",
                      }}
                    >
                      {task.text}
                    </span>
                    <div>
                      <button
                        className="btn btn-sm me-2"
                        style={{ backgroundColor: task.completed ? "#ffc107" : "#28a745", color: "white" }}
                        onClick={() => toggleComplete(task.id)}
                      >
                        {task.completed ? "Undo" : "Done"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>

            {/* Task Summary */}
            <div className="mt-3 text-center text-muted">
              {tasks.filter(t => t.completed).length} / {tasks.length} tasks completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;   