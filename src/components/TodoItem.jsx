function TodoItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>

      <div className="task-info">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <div>
          <h3>{task.text}</h3>

          {task.dueDate && (
            <p>Due: {task.dueDate}</p>
          )}

          <span
            className={
              task.completed
                ? "status completed-status"
                : "status pending-status"
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

      </div>

      <div className="task-actions">

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TodoItem;