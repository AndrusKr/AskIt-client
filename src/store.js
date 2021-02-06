import { applyMiddleware, compose, createStore } from "redux";
import { combineReducers } from "redux-immutable";
import createSagaMiddleware from "redux-saga";
import { Map, Record } from "immutable";
import auth, { defaultState as defaultStateAuth } from "./redux/reducers/auth";
import alert, {
  defaultState as defaultStateAlert,
} from "./redux/reducers/alert";
import questions, {
  defaultState as defaultStateQuestions,
} from "./redux/reducers/questions";
import languages, {
  defaultState as defaultStateLanguages,
} from "./redux/reducers/language";
import common, {
  defaultState as defaultStateCommon,
} from "./redux/reducers/common";
import slide, {
  defaultState as defaultStateSlide,
} from "./redux/reducers/slide";
import user, {
  defaultState as defaultStateUser,
} from "./redux/reducers/user";
import saga from "./redux/saga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // use redux chrome devtools
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const initialState = Map({
  auth: new Record(defaultStateAuth)(),
  alert: new Record(defaultStateAlert)(),
  questions: new Record(defaultStateQuestions)(),
  languages: new Record(defaultStateLanguages)(),
  common: new Record(defaultStateCommon)(),
  slide: new Record(defaultStateSlide)(),
  user: new Record(defaultStateUser)(),
});

const rootReducer = combineReducers({
  auth,
  alert,
  questions,
  languages,
  common,
  slide,
  user,
});

export default () => ({
  ...createStore(rootReducer, initialState, enhancer),
  runSaga: sagaMiddleware.run(saga),
});
