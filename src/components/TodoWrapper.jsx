import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuid } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

/**
 * A React component that renders a list of todos and allows adding/editing/removing todos.
 */
export function TodoWrapper() {
  // Initialize the state to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Add a new todo
  function addTodo(todo) {
    setTodos([
      ...todos,
      { id: uuid(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  }

  // Toggle the completed status of a todo
  function toggleCompleted(id) {
    setTodos(
      todos.map(function (todo) {
        return todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo;
      })
    );
  }

  // Remove a todo
  function deleteTodo(id) {
    setTodos(
      todos.filter(function (todo) {
        return todo.id !== id;
      })
    );
  }

  // Toggle the edit status of a todo
  function editTodo(id) {
    setTodos(
      todos.map(function (todo) {
        return todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo;
      })
    );
  }

  // Update the task of a todo
  function editTask(task, id) {
    setTodos(
      todos.map(function (todo) {
        return todo.id === id
          ? { ...todo, task, isEditing: !todo.isEditing }
          : todo;
      })
    );
  }

  // Render the list of todos
  return (
    <div className="TodoWrapper">
      <h1>To-Do App List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map(function (todo) {
        return todo.isEditing ? (
          // If the todo is being edited, render the EditTodoForm component
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          // If the todo is not being edited, render the Todo component
          <Todo
            task={todo}
            key={todo.id}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        );
      })}
    </div>
  );
}
