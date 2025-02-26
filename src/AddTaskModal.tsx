import styles from "./AddTaskModal.module.scss";
import Button from "./Button";

import { v4 as uuidv4 } from "uuid";

import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

import { Task } from "./TaskWrapper";
import { useState } from "react";

import { formatDate, formatMinDate } from "./formatDate";

type AddTaskModalProps = {
  isModalActive: boolean;
  setIsModalActive: (b: boolean) => void;
  addTask: (task: Task) => void;
};

function AddTaskModal({
  isModalActive,
  setIsModalActive,
  addTask,
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    titleLabel: "",
    deadlineLabel: "",
  });
  const [errors, setErrors] = useState({
    titleError: "",
    deadlineError: "",
  });

  return (
    <ReactModal
      isOpen={isModalActive}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsModalActive(false)}
      className={styles.add__task__modal}
      overlayClassName={styles.modal__overlay}
    >
      <div className={styles.modal__wrapper}>
        <h2 className={styles.modal__subtitle}>Add Task</h2>
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
              const deadline = formatDate(formData.deadlineLabel);
              addTask({
                label: formData.titleLabel,
                completed: false,
                id: uuidv4(),
                deadline: deadline,
              });
              //Clear inputs
              setFormData({
                titleLabel: "",
                deadlineLabel: "",
              });
              setIsModalActive(false);
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
              type="datetime-local"
              id="deadline-input"
              className={styles.form__input}
              min={formatMinDate()}
              value={formData.deadlineLabel}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    deadlineLabel: e.target.value,
                  };
                })
              }
            />
            {errors.deadlineError && (
              <span className={styles.error__message}>
                {errors.deadlineError}
              </span>
            )}
          </div>
          <Button type="submit">Add Task</Button>
        </form>
      </div>

      <button
        onClick={() => {
          setIsModalActive(false);
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

export default AddTaskModal;
