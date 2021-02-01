import {applyMiddleware, compose, createStore} from 'redux';
import {combineReducers} from 'redux-immutable';
import createSagaMiddleware from 'redux-saga';
import {Map, Record} from 'immutable'
import auth, {defaultState as defaultStateAuth} from './reducers/auth';
import alert, {defaultState as defaultStateAlert} from './reducers/alert';
import questions, {defaultState as defaultStateQuestions} from './reducers/questions';
import languages, {defaultState as defaultStateLanguages} from './reducers/language';
import common, {defaultState as defaultStateCommon} from './reducers/common';
import slide, {defaultState as defaultStateSlide} from './reducers/slide';
import saga from './saga'

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
});

const rootReducer = combineReducers({
  auth,
  alert,
  questions,
  languages,
  common,
  slide,
});

export default () => ({
  ...createStore(rootReducer, initialState, enhancer),
  runSaga: sagaMiddleware.run(saga),
})
