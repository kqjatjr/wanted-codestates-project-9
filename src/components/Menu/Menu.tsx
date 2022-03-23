import CustomLink from "../CustomLink/CustomLink";
import styles from "./Menu.module.scss";

const menuList: string[] = ["Home", "Rank", "Track"];

type TProp = {
  currMenu: string;
  onSearchUser: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Menu = ({ currMenu, onSearchUser, onChangeInputValue }: TProp) => {
  return (
    <div className={styles.container}>
      <ul className={styles.menuList}>
        {menuList.map((name) => {
          if (name === "Home") {
            return (
              <li key={name}>
                <CustomLink to={`/`}>{name}</CustomLink>
              </li>
            );
          }

          return (
            <li key={name}>
              <CustomLink to={`/` + name}>{name}</CustomLink>
            </li>
          );
        })}
        {currMenu !== "홈" && (
          <li>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                onChange={onChangeInputValue}
                onKeyPress={onSearchUser}
                placeholder="유저 닉네임을 입력후 Enter를 눌러주세요"
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
