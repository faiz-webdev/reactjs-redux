import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addAsync,
  deleteAsync,
  fetchAsync,
  fetchAsyncFulfilled,
  updateAsync,
} from "./cartSlice";
import { fetchItems } from "./cartAPI";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getCartItems(action) {
  //   try {
  const response = yield call(fetchItems);
  yield put({ type: fetchAsyncFulfilled.toString(), payload: response.data });
  //   } catch (e) {
  //     yield put({ type: "USER_FETCH_FAILED", message: e.message });
  //   }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export function* mySaga() {
  yield takeEvery(fetchAsync.toString(), getCartItems);
}
