import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//store
const store = createStore(reducer, applyMiddleware(logger.default));

const history = [];

// reducer
function reducer(state = { amount: 1 }, action) {
  //state immutibility
  if (action.type === "increment") return { amount: state.amount + 1 };

  if (action.type === "decrement") return { amount: state.amount - 1 };

  if (action.type === "incrementByAmount")
    return { amount: state.amount + action.payload };
  return state;
}

//global state
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//action
// store.dispatch({type:'increment'})
setInterval(() => {
  //   store.dispatch({ type: "increment" });
//   store.dispatch({ type: "decrement" });
  store.dispatch({ type: "incrementByAmount", payload: 4 });
}, 500);
