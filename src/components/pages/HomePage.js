import React, { useEffect, useState } from "react";
import QuestionsPane from "../entities/questions/QuestionsPane";
import socketClient from "../../utils/socketClient";
import { getAuthUser } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../../constants/alerts";
import { getCurrentUserNickname } from "../../selectors/auth";
import Spinner from "../layout/Spinner";
import { useAlert } from "../hooks/useAlert";

const HomePage = () => {
  const dispatch = useDispatch();
  const nickname = useSelector(getCurrentUserNickname());
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const showAlert = useAlert();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await socketClient.connect();
      if (nickname) {
        setIsLogin(true);
      }
      if (!nickname) {
        dispatch(getAuthUser());
      }
    })();
  }, []);

  useEffect(() => {
    if (nickname) {
      const greetings = isLogin ? "Hello for the newcomer" : "Welcome back";
      showAlert(SUCCESS, `${greetings}, ${nickname}!!!`);
      setLoading(false);
    }
  }, [nickname, isLogin]);

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
