import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.kartLogo}
        src="https://tmi.nexon.com/img/assets/logo_kart.png"
        alt="카트라이더 로고"
      />
      <img
        className={styles.tmiImage}
        src="https://tmi.nexon.com/img/assets/tmi_logo_default_b.svg"
        alt="TMI 아이콘"
      />
      <div className={styles.moveSite}>카트라이더 홈페이지 바로가기</div>
    </div>
  );
};

export default Header;
