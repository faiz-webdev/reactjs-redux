import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

//store
const store = createStore(reducer, applyMiddleware(logger.default));

const history = [];

// reducer
function reducer(state = { amount: 1 }, action) {
  //state immutibility
  if (action.type === "increment")
    // state.amount= state.amount+1
    return { amount: state.amount + 1 };
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
  store.dispatch({ type: "increment" });
}, 500);
