import { useEffect, useState } from "react";
import Task from "./Task";
import styles from "./TaskWrapper.module.scss";

import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import Button from "./Button";

import { Category } from "./App";
import { useLocalStorage } from "./useLocalStorage";

type TaskWrapperProps = {
  category: Category;
  sortByCategory: (category: Category, deadline: string) => boolean | undefined;
};

export type Task = {
  label: string;
  id: string;
  completed: boolean;
  deadline: string;
};

function TaskWrapper({ category, sortByCategory }: TaskWrapperProps) {
  const { tasks, setTasks, addTask, deleteTask, editTask, setCompletedTask } =
    useLocalStorage([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const pendingTasks = tasks.filter((task) => task.completed === false);
  const completedTasks = tasks.filter((task) => task.completed === true);
  const sortedByCategoryTasks = tasks.filter((task) => {
    if (task.completed === false) {
      if (category) {
        if (sortByCategory(category, task.deadline)) {
          return task;
        } else {
          return null;
        }
      }
    }
  });

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks") || '""');
    if (Array.isArray(storageTasks)) {
      setTasks(storageTasks);
    }
  }, [setTasks]);

  const shownTasks =
    category === "Pending" ? pendingTasks : sortedByCategoryTasks;

  function findActiveTask(id: string) {
    const activeTask = tasks.find((task) => task.id === id);
    if (activeTask) {
      setActiveTask(activeTask);
    }
  }

  return (
    <div className={styles.task__wrapper}>
      <div className={styles.column}>
        <h2 className={styles.subtitle}>Tasks</h2>
        <Button
          type="button"
          onClickFunction={() => {
            setIsModalActive(true);
          }}
        >
          Add Task
        </Button>
      </div>
      {shownTasks.length ? (
        shownTasks.map((task) => {
          return (
            <Task
              label={task.label}
              key={task.id}
              id={task.id}
              deleteTask={deleteTask}
              completed={task.completed}
              setCompletedTask={setCompletedTask}
              deadline={task.deadline}
              setIsEditing={setIsEditing}
              findActiveTask={findActiveTask}
            />
          );
        })
      ) : (
        <span className={styles.no__tasks__information}>
          Your actual tasks will be shown here
        </span>
      )}
      <div className={styles.completed__wrapper}>
        <div className={styles.completed__row}>
          <span className={styles.completed__title}>Completed</span>
          <button
            className={styles.arrow__btn}
            onClick={() => setIsCompletedActive((prev) => !prev)}
          >
            <figure
              className={
                isCompletedActive
                  ? `${styles.arrow__icon} ${styles.arrow__icon__active}`
                  : `${styles.arrow__icon}`
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                  fill="#000000"
                />
              </svg>
            </figure>
          </button>
        </div>
        {completedTasks &&
          isCompletedActive &&
          completedTasks.map((task) => {
            return (
              <Task
                label={task.label}
                key={task.id}
                id={task.id}
                deleteTask={deleteTask}
                completed={task.completed}
                setCompletedTask={setCompletedTask}
                deadline={task.deadline}
              />
            );
          })}
      </div>
      <AddTaskModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        addTask={addTask}
      />
      <EditTaskModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editTask={editTask}
        activeTask={activeTask}
      />
    </div>
  );
}

export default TaskWrapper;
