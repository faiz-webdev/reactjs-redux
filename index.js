import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

//action name constants
const inc = "account/increment";
const dec = "account/decrement";
const incByAmt = "account/incrementByAmount";
// const init = "account/init";
const getAccUserPending = "account/getUser/pending";
const getAccUserFulFilled = "account/getUser/fulfilled";
const getAccUserRejected = "account/getUser/rejected";

const incBonus = "bonus/increment";

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
    case getAccUserFulFilled:
      return { amount: action.payload, pending: false };
    case getAccUserRejected:
      return { ...state, error: action.error, pending: false };
    case getAccUserPending:
      return { ...state, pending: true };
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
    case incBonus:
      return { points: state.points + 1 };
    case incByAmt:
      if (action.payload >= 100) return { points: state.points + 1 };
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

function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUserFulPending());
      const { data } = await axios.get(`http://localhost:3000/account/${id}`);
      dispatch(getAccountUserFulFilled(data.amount));
    } catch (error) {
      dispatch(getAccountUserFulRejected(error.message));
    }
  };
}

function getAccountUserFulFilled(value) {
  return { type: getAccUserFulFilled, payload: value };
}

function getAccountUserFulRejected(error) {
  return { type: getAccUserRejected, error };
}

function getAccountUserFulPending() {
  return { type: getAccUserPending };
}

function incrementBonus(value) {
  return { type: incBonus };
}

setTimeout(() => {
  //   store.dispatch(incrementByAmount(5));
  //   store.dispatch({ type: "decrement" });
  //   store.dispatch({ type: "incrementByAmount", payload: 4 });
  store.dispatch(getUserAccount(2));
  //   store.dispatch(incrementByAmount(90));
  //   store.dispatch(incrementBonus());
}, 500);
