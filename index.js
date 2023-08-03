import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

//action name constants
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";
const init = "init";

//store
const store = createStore(
  combineReducers({ account: accountReducer, bonus: bonusReducer }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

// reducer
function accountReducer(state = { amount: 1 }, action) {
  //state immutibility
  switch (action.type) {
    case init:
      return { amount: action.payload };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  //state immutibility
  switch (action.type) {
    case inc:
      return { points: state.points + 1 };
    default:
      return state;
  }
}

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//action creator
function increment() {
  return { type: inc };
}

function decrement() {
  return { type: dec };
}

function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    dispatch(initUser(data.amount));
  };
}

function initUser(value) {
  return { type: init, payload: value };
}

setTimeout(() => {
  //   store.dispatch(incrementByAmount(5));
  //   store.dispatch({ type: "decrement" });
  //   store.dispatch({ type: "incrementByAmount", payload: 4 });
//   store.dispatch(getUser(2));
store.dispatch(increment())
}, 500);
