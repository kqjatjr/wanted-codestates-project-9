import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "src/components/Main/Main";
import Menu from "src/components/Menu/Menu";
import Profile from "../Profile/Profile";
import Rank from "../Rank/Rank";
import styles from "./Home.module.scss";

const Home = () => {
  const [nickname, setNickname] = useState<string>();

  const navigate = useNavigate();

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSearchUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      if (nickname?.trim().length) {
        setNickname("");
        navigate(`/user/${nickname}`);
      } else {
        alert("닉네임을 입력해 주세요!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Menu
        onChangeInputValue={handleChangeInputValue}
        onSearchUser={handleSearchUser}
      />
      <div className={styles.layout}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onChangeInputValue={handleChangeInputValue}
                onSearchUser={handleSearchUser}
              />
            }
          />
          <Route path="/user/:nickname" element={<Profile />} />
          <Route path="/Rank" element={<Rank />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
