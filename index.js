import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//action name constants
const inc = "increment";
const dec = "decrement";
const incByAmt = "incrementByAmount";
const init = "init";

//store
const store = createStore(reducer, applyMiddleware(logger.default));

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

function initUser(value) {
  return { type: init, payload: value };
}

setInterval(() => {
  //   store.dispatch(incrementByAmount(5));
  //   store.dispatch({ type: "decrement" });
  //   store.dispatch({ type: "incrementByAmount", payload: 4 });
  store.dispatch(initUser(22));
}, 500);
