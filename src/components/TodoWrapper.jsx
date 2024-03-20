import { useEffect, useState } from "react";
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

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Add a new todo
  function addTodo(todo) {
    let newTodos = [...todos, {
      id: uuid(),
      task: todo,
      completed: false,
      isEditing: false,
    }];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Toggle the completed status of a todo
  function toggleCompleted(id) {
    let updatedTodos = todos.map(function (todo) {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Remove a todo
  function deleteTodo(id) {
    let updatedTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
    let updatedTodos = todos.map(function (todo) {
      return todo.id === id
        ? { ...todo, task, isEditing: !todo.isEditing }
        : todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
