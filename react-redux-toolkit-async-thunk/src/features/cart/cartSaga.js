import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {
  addAsync,
  addAsyncFulFilled,
  deleteAsync,
  deleteAsyncFulfilled,
  fetchAsync,
  fetchAsyncFulfilled,
  updateAsync,
} from "./cartSlice";
import { addItem, deleteItem, fetchItems } from "./cartAPI";

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* getCartItems(action) {
  //   try {
  const response = yield call(fetchItems);
  yield put({ type: fetchAsyncFulfilled.toString(), payload: response.data });
  //   } catch (e) {
  //     yield put({ type: "USER_FETCH_FAILED", message: e.message });
  //   }
}

function* addCartItems(action) {
  const { id, title, brand, thumbnail, price } = action.payload;
  const response = yield call(addItem, {
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  yield put({ type: addAsyncFulFilled.toString(), payload: response.data });
}

function* deleteCartItems(action) {
    //   try {
    const response = yield call(deleteItem, action.payload);
    console.log('action.payload.id', action.payload);
    yield put({ type: deleteAsyncFulfilled.toString(), payload: response.data });
    //   } catch (e) {
    //     yield put({ type: "USER_FETCH_FAILED", message: e.message });
    //   }
  }

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* watchGetItems() {
  yield takeEvery(fetchAsync.toString(), getCartItems);
}

function* watchAddItems() {
  yield takeEvery(addAsync.toString(), addCartItems);
}

function* watchDeleteItems() {
    yield takeEvery(deleteAsync.toString(), deleteCartItems);
  }

export function* mySaga() {
  yield all([watchAddItems(), watchGetItems(), watchDeleteItems()]);
}
