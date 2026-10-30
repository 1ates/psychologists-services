import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.spinner} role="status" aria-label="Loading" />
);

export default Loader;
