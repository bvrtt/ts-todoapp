import { useState } from "react";
import styles from "./App.module.scss";

import TaskWrapper from "./TaskWrapper";

export type Category = "Today" | "Pending" | "Overdue";

function App() {
  const [category, setCategory] = useState<Category>("Pending");

  function sortByCategory(category: Category, deadline: string) {
    switch (category) {
      case "Today": {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const deadlineArr = deadline.split("");

        //If year is not the same return false
        if (+deadlineArr.slice(0, 4).join("") !== year) {
          console.log("zly rok");
          return false;
        }

        //If month is not the same return false
        if (+deadlineArr.slice(5, 7).join("") !== month) {
          return false;
        }

        //If day is not the same return false
        if (+deadlineArr.slice(8, 10).join("") !== day) {
          return false;
        }

        return true;
      }

      case "Overdue": {
        const todayTimeStamp = new Date();
        const deadlineTimeStamp = new Date(deadline);

        if (todayTimeStamp > deadlineTimeStamp) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.app__title}>Todo App</h1>
      </header>
      <div className={styles.app__wrapper}>
        <div className={styles.categories__wrapper}>
          <button
            className={`${styles.btn} ${
              category === "Today" ? `${styles.btn__active}` : ""
            }`}
            onClick={() => setCategory("Today")}
          >
            Today
          </button>
          <button
            className={`${styles.btn} ${
              category === "Pending" ? `${styles.btn__active}` : ""
            }`}
            onClick={() => setCategory("Pending")}
          >
            Pending
          </button>
          <button
            className={`${styles.btn} ${
              category === "Overdue" ? `${styles.btn__active}` : ""
            }`}
            onClick={() => setCategory("Overdue")}
          >
            Overdue
          </button>
        </div>
      </div>
      <TaskWrapper category={category} sortByCategory={sortByCategory} />
    </div>
  );
}

export default App;
