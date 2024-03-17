import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";

// Defining the `Todo` component which receives `task`, `toggleCompleted`, `deleteTodo`, and `editTodo` props
export function Todo({ task, toggleCompleted, deleteTodo, editTodo }) {
  return (
    <div className="Todo">
      <p
        onClick={function () {
          toggleCompleted(task.id);
        }}
        className={`${task.completed ? "completed" : "incompleted"}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={function () {
            editTodo(task.id);
          }}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={function () {
            deleteTodo(task.id);
          }}
        />
      </div>
    </div>
  );
}
