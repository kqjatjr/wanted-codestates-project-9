import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import Main from "src/components/Main/Main";
import Menu from "src/components/Menu/Menu";
import Profile from "../Profile/Profile";
import styles from "./Home.module.scss";

const Home = () => {
  const [nickname, setNickname] = useState<string>();
  const [currMenu, setCurrMenu] = useState("Home");

  let resolved = useResolvedPath("/");
  let match = useMatch({ path: resolved.pathname, end: true });

  const navigate = useNavigate();

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSearchUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      if (nickname?.trim().length) {
        setNickname("");
        setCurrMenu("");
        navigate(`/user/${nickname}`);
      } else {
        alert("닉네임을 입력해 주세요!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Menu
        currMenu={currMenu}
        onChangeMenu={setCurrMenu}
        onChangeInputValue={handleChangeInputValue}
        onSearchUser={handleSearchUser}
      />
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
      </Routes>
    </div>
  );
};

export default Home;
