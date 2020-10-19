import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <img
    src={spinner}
    alt="Loading..."
    style={{
      display: "block",
      margin: "auto",
      marginTop: "15vh",
    }}
  />
);

export default Spinner;
