import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  // Save tasks to Local Storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update a task
  const addTask = () => {
    if (!taskText.trim()) {
      alert("Please enter a task");
      return;
    }

    if (editingId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                text: taskText,
                dueDate: dueDate,
              }
            : task
        )
      );

      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        dueDate: dueDate,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    setTaskText("");
    setDueDate("");
  };

  // Mark task completed/pending
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Load task data into form for editing
  const editTask = (task) => {
    setTaskText(task.text);
    setDueDate(task.dueDate);
    setEditingId(task.id);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  return (
    <section className="todo-section">

      <div className="page-heading">
        <h1>My To-Do List</h1>
        <p>Organize your daily tasks</p>
      </div>

      <div className="todo-form">

        <input
          type="text"
          placeholder="Enter a task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>
          {editingId !== null ? "Update Task" : "Add Task"}
        </button>

      </div>

      <div className="filter-buttons">

        <button
          className={filter === "all" ? "selected" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "pending" ? "selected" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>

        <button
          className={filter === "completed" ? "selected" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>

      <div className="task-list">

        {filteredTasks.length === 0 ? (
          <div className="empty-message">
            No tasks available.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default TodoApp;