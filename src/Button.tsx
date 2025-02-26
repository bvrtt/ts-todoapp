import styles from "./Button.module.scss";

type ButtonProps = {
  onClickFunction?: () => void;
  children: React.ReactNode;
  type: "submit" | "button";
};

function Button({ onClickFunction, children, type }: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.add__button}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
}

export default Button;
