import styles from "./Menu.module.scss";

const menuList: string[] = ["홈", "랭킹", "트랙"];

const Menu = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.menuList}>
        {menuList.map((name) => {
          return (
            <li key={name}>
              <div className={styles.menuName}>{name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
