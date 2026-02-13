import React, { useState, useEffect } from "react";
import styles from "./TaskDetails.module.css";

/* ===== DATE FORMATTER ===== */
const formatDate = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function TaskBoard() {
  const [showModal, setShowModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [
      {
        title: "Create Hero Section",
        date: "2024-04-14",
        difficulty: "Intermediate",
      },
    ],
    completed: [
      {
        title: "Create Contact",
        date: "2024-04-12",
        difficulty: "Easy",
      },
    ],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    difficulty: "",
  });

  const isFormValid =
    newTask.title.trim() &&
    newTask.date &&
    newTask.difficulty;

  const handleAddTask = () => {
    if (!isFormValid) return;

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));

    setNewTask({ title: "", date: "", difficulty: "" });
    setShowModal(false);
  };

  /* ===== DRAG HANDLERS ===== */
  const handleDragStart = (task, from) => {
    setDraggedTask({ task, from });
  };

  const handleDrop = (to) => {
    if (!draggedTask || draggedTask.from === to) return;

    setTasks((prev) => ({
      ...prev,
      [draggedTask.from]: prev[draggedTask.from].filter(
        (t) => t !== draggedTask.task
      ),
      [to]: [...prev[to], draggedTask.task],
    }));

    setDraggedTask(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ===== DETAILED CARD ===== */}
        <div className={styles.cardContainer}>
          <div className={styles.cardMetaCard}>
            <h2 className={styles.cardTitle}>
              Build a Responsive Landing Page
            </h2>
            <div className={styles.cardMeta}>
              <span className={styles.due}>
                Due: {formatDate("2024-04-25")}
              </span>
              <span className={styles.difficulty}>
                Difficulty: Intermediate
              </span>
              <span className={styles.skill}>HTML</span>
              <span className={styles.skill}>CSS</span>
            </div>
          </div>

          <div className={styles.cardDescriptionCard}>
            <p className={styles.cardDescription}>
              Create a responsive landing page for a mock product. Ensure the
              page is mobile-friendly and visually appealing, including a hero
              section, features list, and contact form. Submit your GitHub
              repository link with your completed page.
            </p>
          </div>
        </div>

        {/* ===== TASK BOARD ===== */}
        <div className={styles.board}>
          <TaskColumn
            title="To Do"
            tasks={tasks.todo}
            onDrop={() => handleDrop("todo")}
            onDragStart={handleDragStart}
            type="todo"
          >
            <button
              className={styles.addTask}
              onClick={() => setShowModal(true)}
            >
              + Add Task
            </button>
          </TaskColumn>

          <TaskColumn
            title="In Progress"
            tasks={tasks.inProgress}
            onDrop={() => handleDrop("inProgress")}
            onDragStart={handleDragStart}
            type="inProgress"
          />

          <TaskColumn
            title="Done"
            tasks={tasks.completed}
            onDrop={() => handleDrop("completed")}
            onDragStart={handleDragStart}
            type="completed"
            setTasks={setTasks}
          />
        </div>
      </div>

      {/* ===== ADD TASK MODAL ===== */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add New Task</h3>

            <label className={styles.label}>Task Title</label>
            <input
              className={styles.input}
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />

            <label className={styles.label}>Deadline</label>
            <input
              type="date"
              className={styles.input}
              value={newTask.date}
              onChange={(e) =>
                setNewTask({ ...newTask, date: e.target.value })
              }
            />

            <label className={styles.label}>Difficulty</label>
            <select
              className={styles.input}
              value={newTask.difficulty}
              onChange={(e) =>
                setNewTask({ ...newTask, difficulty: e.target.value })
              }
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              className={styles.modalButton}
              onClick={handleAddTask}
              disabled={!isFormValid}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== COLUMN ===== */
function TaskColumn({
  title,
  tasks,
  onDrop,
  onDragStart,
  type,
  setTasks,
  children,
}) {
  const handleDelete = (task) => {
    if (!setTasks) return;
    setTasks((prev) => ({
      ...prev,
      completed: prev.completed.filter((t) => t !== task),
    }));
  };

  return (
    <div
      className={styles.column}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>{title}</h3>

      {tasks.map((task, i) => (
        <TaskCard
          key={i}
          task={task}
          type={type}
          onDragStart={onDragStart}
          onDelete={handleDelete}
        />
      ))}

      {children}
    </div>
  );
}

/* ===== TASK CARD ===== */
function TaskCard({ task, type, onDragStart, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const close = () => setShowMenu(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <>
      <div
        className={`${styles.taskCard} ${
          type === "completed" ? styles.completedCard : ""
        }`}
        draggable={type !== "completed"}
        onDragStart={() => type !== "completed" && onDragStart(task, type)}
      >
        {type === "completed" && (
  <>
    <span
      className={styles.dots}
      onClick={(e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
      }}
    >
      ⋮
    </span>

    <span className={styles.tickBadge}>✓</span>

    {showMenu && (
      <div className={styles.menu}>
        <div
          className={styles.menuItem}
          onClick={() => {
            setShowMenu(false);
            setShowConfirm(true);
          }}
        >
          Delete
        </div>
      </div>
    )}
  </>
)}


        <p className={styles.taskTitle}>{task.title}</p>
        <p className={styles.taskDate}>
          Due: {formatDate(task.date)}
        </p>
        <span className={styles.taskDifficulty}>{task.difficulty}</span>
      </div>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Task</h3>
            <p>Do you really want to delete this task?</p>

            <div className={styles.confirmActions}>
              <button
                className={styles.yesBtn}
                onClick={() => {
                  onDelete(task);
                  setShowConfirm(false);
                }}
              >
                ✓ Yes
              </button>

              <button
                className={styles.noBtn}
                onClick={() => setShowConfirm(false)}
              >
                ✕ No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}