import { useState } from "react";

/**
 * Component for the form used to add a new TODO task.
 *
 * @param {function} addTodo - The function to be called when a new task is added.
 */
export function TodoForm({ addTodo }) {
  const [value, setValue] = useState(""); // State variable to store the user's input for the new task.

  /**
   * Handles the submission of the form when adding a new task.
   *
   * @param {Object} event - The submit event triggered upon form submission.
   */
  function submitTask(event) {
    event.preventDefault();

    if (value) {
      addTodo(value); // Adds the new task to the list of tasks.
      setValue(""); // Resets the input field to an empty state.
    } else {
      alert("Task Cannot be empty");
    }
  }

  return (
    <form className="TodoForm" onSubmit={submitTask}>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter Your Task"
        value={value}
        // Handles the input field changes and updates the state variable "value".
        onChange={function (event) {
          setValue(event.target.value);
        }}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}
