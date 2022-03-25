import { useMatch, useResolvedPath } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import styles from "./Menu.module.scss";

const menuList: string[] = ["Home", "Rank"];

type TProp = {
  onSearchUser: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Menu = ({ onSearchUser, onChangeInputValue }: TProp) => {
  let resolved = useResolvedPath("/");
  let match = useMatch({ path: resolved.pathname, end: true });
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
      </ul>
      {!match && (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            onChange={onChangeInputValue}
            onKeyPress={onSearchUser}
            placeholder="유저 닉네임을 입력후 Enter를 눌러주세요"
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
