import classNames from "classnames";
import styles from "./MainLoading.module.scss";

const MainLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={classNames(styles.loading, styles.loadingCircle)}>
        <div></div>
      </div>
    </div>
  );
};

export default MainLoading;
