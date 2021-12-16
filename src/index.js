import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./css/index.css";
import store from "./store";

const AppProvider = () => {
  return (
    <Suspense fallback={<div />}>
      <Provider store={store()}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
};

ReactDOM.render(<AppProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
