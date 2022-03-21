import Menu from "../../components/Menu/Menu";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.searchContainer}>
        <p className={styles.titleB}>KartRider RECORD</p>
      </div>
      <div className={styles.inputContainer}>
        <input
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

export default Home;
