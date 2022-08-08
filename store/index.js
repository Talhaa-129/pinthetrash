import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import globalReducer from "./reducer";

function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    ...injectedReducers,
    // other non-injected reducers can go here...
  });
  return rootReducer;
}

// const composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();
const runSaga = sagaMiddleware.run;

const injectEnhancer = createInjectorsEnhancer({
  createReducer,
  runSaga,
});

const middlewares = [sagaMiddleware];

const store = createStore(
  createReducer(),
  {},
  composeWithDevTools(applyMiddleware(...middlewares), injectEnhancer)
);

export default store;
