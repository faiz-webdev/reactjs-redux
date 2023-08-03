import axios from "axios";

//action name constants
// const init = "account/init";
export const inc = "account/increment";
export const dec = "account/decrement";
export const incByAmt = "account/incrementByAmount";
export const getAccUserPending = "account/getUser/pending";
export const getAccUserFulFilled = "account/getUser/fulfilled";
export const getAccUserRejected = "account/getUser/rejected";

const incBonus = "bonus/increment";

const getPostFulFilled = "posts/postFulFilled";
const getPostRejected = "posts/getPostRejected";
const getPostPending = "posts/getPostPending";

//action creator
export function increment() {
  return { type: inc };
}

export function decrement() {
  return { type: dec };
}

export function incrementByAmount(value) {
  return { type: incByAmt, payload: value };
}

export function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUserFulPending());
      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
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

/** @getpost start */

function getPosts() {
  return async (dispatch, getState) => {
    try {
      dispatch(getPostsPending());
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      dispatch(getPostsFulFilled(data));
    } catch (error) {
      dispatch(getPostsFulRejected(error.message));
    }
  };
}

function getPostsFulFilled(value) {
  return { type: getPostFulFilled, payload: value };
}

function getPostsFulRejected(error) {
  return { type: getPostRejected, error };
}

function getPostsPending() {
  return { type: getPostPending };
}
