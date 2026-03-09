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

  /* ===== FETCH DATA ===== */

  useEffect(() => {

    const fetchDetails = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await axios.get(
          `http://localhost:8003/api/workplace/details?email=${email}`
        );

        setData(res.data);

        const taskRes = await axios.get(
          `http://localhost:8003/api/tasks/tasks?email=${email}`
        );

        const apiTasks = taskRes.data;

        setTasks({
          todo: apiTasks.filter((t) => t.status === "todo"),
          inProgress: apiTasks.filter((t) => t.status === "inProgress"),
          completed: apiTasks.filter((t) => t.status === "completed"),
        });

      } catch (err) {
        console.error(err);
      }

    };

    fetchDetails();

  }, []);

  /* ===== ADD TASK ===== */

  const isFormValid =
    newTask.title.trim() &&
    newTask.date &&
    newTask.difficulty;

  const handleAddTask = async () => {

    if (!isFormValid) return;

    try {

      const email = localStorage.getItem("userEmail");

      const res = await axios.post(
        "http://localhost:8003/api/tasks/create-task",
        {
          email,
          title: newTask.title,
          date: newTask.date,
          difficulty: newTask.difficulty
        }
      );

      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, res.data]
      }));

      setNewTask({ title: "", date: "", difficulty: "" });

      setShowModal(false);

    } catch (err) {
      console.error(err);
    }
  };

  /* ===== DELETE TASK ===== */

  const handleDeleteTask = async (taskId, type) => {

    try {

      await axios.delete(
        `http://localhost:8003/api/tasks/delete-task/${taskId}`
      );

      setTasks((prev) => ({
        ...prev,
        [type]: prev[type].filter((t) => t._id !== taskId)
      }));

    } catch (err) {
      console.error(err);
    }
  };

  /* ===== DRAG ===== */

  const handleDragStart = (task, from) => {
    setDraggedTask({ task, from });
  };

  const handleDrop = async (to) => {

    if (!draggedTask || draggedTask.from === to) return;

    try {

      await axios.put(
        `http://localhost:8003/api/tasks/update-task/${draggedTask.task._id}`,
        { status: to }
      );

      setTasks((prev) => ({
        ...prev,
        [draggedTask.from]: prev[draggedTask.from].filter(
          (t) => t._id !== draggedTask.task._id
        ),
        [to]: [...prev[to], { ...draggedTask.task, status: to }]
      }));

    } catch (err) {
      console.error(err);
    }

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

              <span className={styles.Due}>
                Due: {formatDate(data?.project?.submissionDeadline)}
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
            onDelete={handleDeleteTask}
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
            onDelete={handleDeleteTask}
          />


          <TaskColumn
            title="Done"
            tasks={tasks.completed}
            onDrop={() => handleDrop("completed")}
            onDragStart={handleDragStart}
            type="completed"
            onDelete={handleDeleteTask}
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
                  difficulty: e.target.value
                })
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
  children,
  onDelete
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
          onDelete={onDelete}
        />

      ))}

      {children}

    </div>
  );
}


/* ===== TASK CARD ===== */

function TaskCard({ task, type, onDragStart, onDelete }) {

  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    alert("Update feature coming soon");
  };

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

      <div className={styles.taskHeader}>

        <p className={styles.taskTitle}>{task.title}</p>

        <div className={styles.iconContainer}>

          {type === "completed" ? (
            <span className={styles.doneTick}>✔</span>
          ) : (
            <span
              className={styles.editIcon}
              onClick={handleEdit}
            >
              ✏️
            </span>
          )}

          <span
            className={styles.menuDots}
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </span>

          {showMenu && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={() => onDelete(task._id, type)}
              >
                Delete
              </button>
            </div>
          )}

        </div>

      </div>

      <p className={styles.taskDate}>
        Due: {formatDate(task.date)}
      </p>

      <span className={styles.taskDifficulty}>
        {task.difficulty}
      </span>

    </div>
  );
}