import React, { useEffect, useState } from "react";
import QuestionsPane from "../entities/questions/QuestionsPane";
import socketClient from "../../utils/socketClient";
import { getAuthUser } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../../constants/alerts";
import { getNickname } from "../../redux/selectors/auth";
import Spinner from "../layout/Spinner";
import { useAlert } from "../hooks/useAlert";
import { setIsSocketConnected } from "../../redux/actions/common";

const HomePage = () => {
  const dispatch = useDispatch();
  const nickname = useSelector(getNickname);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const showAlert = useAlert();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await socketClient.connect();
      console.log("CHECK========= HERE");
      dispatch(setIsSocketConnected(true));
      setLoading(false);
      // if (nickname) {
      //   setIsLogin(true);
      // }
      // if (!nickname) {
      //   dispatch(getAuthUser());
      // }
    })();
  }, []);
  // }, [localStorage.getItem("jwt")]);

  // useEffect(() => {
  //   console.log("nickname", nickname);
  //   if (nickname) {
  //     const greetings = isLogin ? "Hello for the newcomer" : "Welcome back";
  //     showAlert(SUCCESS, `${greetings}, ${nickname}!!!`);
  //     setLoading(false);
  //   }
  // }, [nickname, isLogin]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <QuestionsPane />
    </main>
  );
};

export default HomePage;
