import styles from "./Task.module.scss";

//Icons
import clockIcon from "./icons/clock-icon.svg";

type TaskProps = {
  label: string;
  deleteTask: (id: string) => void;
  id: string;
  completed: boolean;
  deadline: string;
  setCompletedTask: (id: string) => void;
  setIsEditing?: (b: boolean) => void;
  findActiveTask?: (id: string) => void;
};

function Task({
  label,
  deleteTask,
  id,
  completed,
  deadline,
  setCompletedTask,
  setIsEditing,
  findActiveTask,
}: TaskProps) {
  return (
    <div className={styles.task__wrapper}>
      <div className={styles.label__wrapper}>
        <input
          type="checkbox"
          name="completed-checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => {
            setCompletedTask(id);
          }}
        />
        <span
          className={
            completed
              ? `${styles.task__label} ${styles.completed}`
              : `${styles.task__label}`
          }
        >
          {label}
        </span>
      </div>
      <span className={styles.time}>
        <img
          src={clockIcon}
          alt="Clock Icon"
          className={`${styles.icon} ${styles.clock__icon}`}
        />
        {deadline}
      </span>
      <div className={styles.icons__wrapper}>
        {
          //Don't render edit button for completed tasks
          !completed && (
            <button
              onClick={() => {
                //Telling TS those values aren't undefined because
                //they are provided for uncompleted tasks only
                setIsEditing!(true);
                findActiveTask!(id);
              }}
              className={styles.icon__btn}
              title="Edit Todo"
            >
              <figure className={`${styles.icon} ${styles.pen__icon}`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4998 5.50067L18.3282 8.3291M13 21H21M3 21.0004L3.04745 20.6683C3.21536 19.4929 3.29932 18.9052 3.49029 18.3565C3.65975 17.8697 3.89124 17.4067 4.17906 16.979C4.50341 16.497 4.92319 16.0772 5.76274 15.2377L17.4107 3.58969C18.1918 2.80865 19.4581 2.80864 20.2392 3.58969C21.0202 4.37074 21.0202 5.63707 20.2392 6.41812L8.37744 18.2798C7.61579 19.0415 7.23497 19.4223 6.8012 19.7252C6.41618 19.994 6.00093 20.2167 5.56398 20.3887C5.07171 20.5824 4.54375 20.6889 3.48793 20.902L3 21.0004Z"
                    stroke="#a7a5a5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </figure>
            </button>
          )
        }
        <button
          onClick={() => {
            deleteTask(id);
          }}
          className={styles.icon__btn}
          title="Remove task"
        >
          <figure className={`${styles.icon} ${styles.trashcan__icon}`}>
            <svg
              fill="#a7a5a5"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 26c0 1.656 1.343 3 3 3h10c1.656 0 3-1.344 3-3l2-16h-20l2 16zM19 13h2v13h-2v-13zM15 13h2v13h-2v-13zM11 13h2v13h-2v-13zM25.5 6h-6.5c0 0-0.448-2-1-2h-4c-0.553 0-1 2-1 2h-6.5c-0.829 0-1.5 0.671-1.5 1.5s0 1.5 0 1.5h22c0 0 0-0.671 0-1.5s-0.672-1.5-1.5-1.5z"></path>
            </svg>
          </figure>
        </button>
      </div>
    </div>
  );
}

export default Task;
