import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <a href="https://kart.nexon.com/main/index.aspx">
        <img
          className={styles.kartLogo}
          src="https://tmi.nexon.com/img/assets/logo_kart.png"
          alt="카트라이더 로고"
        />
      </a>

      <div className={styles.moveSite}>
        <a href="https://kart.nexon.com/main/index.aspx">
          카트라이더 홈페이지 바로가기
        </a>
      </div>
    </div>
  );
};

export default Header;
