import React, { useState } from "react";

interface Todoitem {
  id: number;
  text: string;
  completed: boolean;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todoitem[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todoitem = { id: todos.length + 1, text, completed: true };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} - {todo.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>
    </div>
  );
};

export default ToDo;