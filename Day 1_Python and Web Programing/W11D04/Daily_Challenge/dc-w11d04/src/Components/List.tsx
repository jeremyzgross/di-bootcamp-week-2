import React from "react";
import { nanoid } from "nanoid";
import { useState, useRef } from "react";

interface Todo {
  id?: number | string
  task?: string
}

const List: React.FC=()=>{
  const [todos, setTodos] = useState<Todo[]>([])
   const addedTask = useRef<HTMLInputElement>(null);

    const addTodo = () => {
    const newTodo: Todo = {
      id: nanoid(),
      task: addedTask.current?.value?.trim()
    };
    setTodos([...todos, newTodo]);
  };

  return(
    <>
    <h3>List Items</h3>
    <input ref={addedTask} type="text" placeholder="Add Todo..." />
    <button onClick={addTodo}>Add Todo</button>
    {todos.map((todo)=>(
      <li key={todo.id}>{todo.task}</li>
    ))}
    </>
  )
}

export default List