import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

//action name constants
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";
const init = "init";

//store
const store = createStore(
  reducer,
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

// reducer
function reducer(state = { amount: 1 }, action) {
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

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//Async API call
async function getUser() {
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  console.log(data);
}
// getUser();

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

async function initUser(dispatch, getState) {
  //   return { type: init, payload: value };
  const { data } = await axios.get("http://localhost:3000/accounts/1");
  //   return { type: init, payload: data.amount };
  dispatch({ type: init, payload: data.amount });
}

setInterval(() => {
  //   store.dispatch(incrementByAmount(5));
  //   store.dispatch({ type: "decrement" });
  //   store.dispatch({ type: "incrementByAmount", payload: 4 });
  store.dispatch(initUser);
}, 500);
