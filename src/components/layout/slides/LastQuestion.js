import React from "react";
import SlideQuestion from "./SlideQuestion";
import { useTranslation } from "react-i18next";

const LastQuestion = ({ lastQuestion }) => {
  const { t } = useTranslation();
  if (!lastQuestion) {
    return "";
  }

  return (
    <>
      <h2 className={"last-question-title"}>{t("latestQuestion")}</h2>
      <div className={"slide last-slide"}>
        <SlideQuestion question={lastQuestion} />
      </div>
    </>
  );
};

export default LastQuestion;
