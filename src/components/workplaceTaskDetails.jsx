import React, { useState, useEffect } from "react";
import styles from "./workplaceTaskDetails.module.css";
import axios from "axios";

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
  const [data, setData] = useState(null);

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    difficulty: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8003/api/workplace/details"
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, []);

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
        {/* ===== PROJECT INFO ===== */}
        <div className={styles.cardContainer}>
          <div className={styles.cardMetaCard}>
            <h2 className={styles.cardTitle}>
              {data?.project?.title || "No Project"}
            </h2>

            <div className={styles.cardMeta}>
              <span className={styles.due}>
                Due: {formatDate(data?.hackathon?.end)}
              </span>

              <span className={styles.difficulty}>
                Theme: {data?.hackathon?.theme}
              </span>
            </div>
          </div>

          <div className={styles.cardDescriptionCard}>
            <p className={styles.cardDescription}>
              {data?.project?.description ||
                "Project description not available"}
            </p>
          </div>
        </div>

        {/* ===== KANBAN BOARD ===== */}
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
          />
        </div>
      </div>

      {/* ===== ADD TASK MODAL ===== */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add New Task</h3>

            <input
              className={styles.input}
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />

            <input
              type="date"
              className={styles.input}
              value={newTask.date}
              onChange={(e) =>
                setNewTask({ ...newTask, date: e.target.value })
              }
            />

            <select
              className={styles.input}
              value={newTask.difficulty}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  difficulty: e.target.value,
                })
              }
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">
                Intermediate
              </option>
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
  children,
}) {
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
        />
      ))}

      {children}
    </div>
  );
}

/* ===== TASK CARD ===== */
function TaskCard({ task, type, onDragStart }) {
  return (
    <div
      className={`${styles.taskCard} ${
        type === "completed" ? styles.completedCard : ""
      }`}
      draggable={type !== "completed"}
      onDragStart={() =>
        type !== "completed" && onDragStart(task, type)
      }
    >
      <p className={styles.taskTitle}>{task.title}</p>

      <p className={styles.taskDate}>
        Due: {formatDate(task.date)}
      </p>

      <span className={styles.taskDifficulty}>
        {task.difficulty}
      </span>
    </div>
  );
}