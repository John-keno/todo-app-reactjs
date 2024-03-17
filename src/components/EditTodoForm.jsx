// Utilizing the `useState` hook from React to create and manage state variables
import { useState } from "react";

// Defining a functional component called `EditTodoForm` with three parameters: `props` (destructured as `{editTodo, task}`)
export function EditTodoForm({ editTodo, task }) {
  // Deconstructing `useState` hook to handle a local state variable called `value` and its updater function `setValue`
  const [value, setValue] = useState(task.task);

  // Handling the `submitTask` function, which will be triggered when the user submits the form
  function submitTask(event) {
    event.preventDefault();

    // Handling the conditional statement for setting up the response based on the provided value of the input field
    if (value) {
      // Calling the provided `editTodo` prop with the required arguments (`value` and `task.id`)
      editTodo(value, task.id);
      // Updating the local state of `value` by setting it to an empty string
      setValue("");
    } else {
      //reset input field Value to the initial task
      setValue(task.task);
      // Alerting the user about the empty input field when the user attempts to submit the form without entering any data
      alert("Task cannot be empty");
    }
  }

  // Creating a `form` element with a custom handler called `submitTask` for the "submit" event
  return (
    <form className="TodoForm" onSubmit={submitTask}>
      {/* Adding a child for rendering the `input` element for the user to modify the task and update the `value` state with the provided data */}
      <input
        type="text"
        className="todo-input"
        placeholder="Update Your Task"
        value={value}
        // Defining the behavior of the `input` element when the user interacts with it by using the state setter function `setValue`
        onChange={function (event) {
          setValue(event.target.value);
        }}
      />
      

      {/* Creating a `button` element with the type "submit" and a predefined text "Update Task" to trigger the `submitTask` handler */}
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
}
