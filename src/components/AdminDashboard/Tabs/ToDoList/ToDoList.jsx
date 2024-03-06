import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./ToDoList.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete task 1", completed: false },
    { id: 2, text: "Complete task 2", completed: true },
    { id: 3, text: "Complete task 3", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: todos.length + 1,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-heading">To Do List</h2>
      <div className="input-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new item..."
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-items">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "todo-item completed" : "todo-item"}
            onClick={() => handleToggle(todo.id)}
          >
            <span className="todo-text">{todo.text}</span>
            {todo.completed && <FaCheck className="check-icon" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
