import React from "react";
import styles from "./Main.module.scss";

type TProp = {
  onSearchUser: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Main = ({ onChangeInputValue, onSearchUser }: TProp) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <p className={styles.titleB}>KartRider RECORD</p>
      </div>
      <div className={styles.inputContainer}>
        <input
          onChange={onChangeInputValue}
          onKeyPress={onSearchUser}
          className={styles.serchInput}
          placeholder="유저 닉네임을 입력후 Enter를 눌러주세요"
        />
      </div>
      <img
        className={styles.dao}
        src="	https://tmi.nexon.com/img/assets/covid_right.png"
        alt="다오"
      />
      <img
        className={styles.bazzi}
        src="https://tmi.nexon.com/img/assets/covid_left.png"
        alt="배찌"
      />
      <span className={styles.leftArrow} />
      <span className={styles.rightArrow} />
    </div>
  );
};

export default Main;
