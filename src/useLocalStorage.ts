import { useState } from "react";
import { Task } from "./TaskWrapper";
import { formatDate } from "./formatDate";

export function useLocalStorage(initialValue: Task[] | []) {
  const [tasks, setTasks] = useState(initialValue);

  function addTask(task: Task) {
    setTasks((prevTasks) => {
      return [...prevTasks, task];
    });
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== id))
    );
  }

  function editTask(id: string, label: string, deadline: string) {
    const formatedDeadline = formatDate(deadline);
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            label,
            deadline: formatedDeadline,
          };
        } else {
          return task;
        }
      });
    });

    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              label,
              deadline: formatedDeadline,
            };
          } else {
            return task;
          }
        })
      )
    );
  }

  function setCompletedTask(id: string) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: true,
          };
        } else {
          return task;
        }
      });
    });

    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              completed: true,
            };
          } else {
            return task;
          }
        })
      )
    );
  }

  return { tasks, setTasks, addTask, deleteTask, editTask, setCompletedTask };
}
