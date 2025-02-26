import styles from "./AddTaskModal.module.scss";
import Button from "./Button";

import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

import { Task } from "./TaskWrapper";
import { useEffect, useState } from "react";

import { formatMinDate } from "./formatDate";

type EditTaskModalProps = {
  isEditing: boolean;
  setIsEditing: (b: boolean) => void;
  editTask: (id: string, label: string, deadline: string) => void;
  activeTask: Task | null;
};

function EditTaskModal({
  isEditing,
  setIsEditing,
  editTask,
  activeTask,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState({
    titleLabel: "",
    deadlineLabel: "",
  });
  const [errors, setErrors] = useState({
    titleError: "",
    deadlineError: "",
  });

  //Fill inputs with data from active task
  useEffect(() => {
    if (isEditing && activeTask) {
      setFormData({
        titleLabel: activeTask.label,
        deadlineLabel: activeTask.deadline,
      });
    }
  }, [activeTask, isEditing]);

  return (
    <ReactModal
      isOpen={isEditing}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsEditing(false)}
      className={styles.add__task__modal}
      overlayClassName={styles.modal__overlay}
    >
      <div className={styles.modal__wrapper}>
        <h2 className={styles.modal__subtitle}>Edit Task</h2>
        <form
          className={styles.form__wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            //Show error if title input is empty
            if (!formData.titleLabel.length) {
              setErrors((prevErrors) => {
                return {
                  ...prevErrors,
                  titleError: "Title must contain at least 1 character",
                };
              });
              //Show error if date input is empty
            } else if (!formData.deadlineLabel.length) {
              setErrors({
                titleError: "",
                deadlineError: "You must pick date",
              });
            } else {
              //If all inputs are filled
              //Clear errors and add task
              setErrors({
                titleError: "",
                deadlineError: "",
              });
              if (activeTask) {
                editTask(
                  activeTask.id,
                  formData.titleLabel,
                  formData.deadlineLabel
                );
              }
              setIsEditing(false);
            }
          }}
        >
          <div className={styles.input__wrapper}>
            <label htmlFor="title-input" className={styles.form__label}>
              Task Title
            </label>
            <input
              type="text"
              id="title-input"
              className={styles.form__input}
              value={formData.titleLabel}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    titleLabel: e.target.value,
                  };
                })
              }
            />
            {errors.titleError && (
              <span className={styles.error__message}>{errors.titleError}</span>
            )}
          </div>
          <div className={styles.input__wrapper}>
            <label htmlFor="deadline-input" className={styles.form__label}>
              Deadline
            </label>
            <input
              id="deadline-input"
              min={formatMinDate()}
              type="datetime-local"
              value={formData.deadlineLabel}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    deadlineLabel: e.target.value,
                  };
                })
              }
              className={styles.form__input}
            />
            {errors.deadlineError && (
              <span className={styles.error__message}>
                {errors.deadlineError}
              </span>
            )}
          </div>
          <Button type="submit">Save Task</Button>
        </form>
      </div>

      <button
        onClick={() => {
          setIsEditing(false);
        }}
        title="Close window"
        className={styles.close__btn}
        tabIndex={0}
      >
        X
      </button>
    </ReactModal>
  );
}

export default EditTaskModal;
