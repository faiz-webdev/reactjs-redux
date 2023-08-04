import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: 10,
};

export const getUserAccount = createAsyncThunk(
  "account/getUser",
  // Declare the type your function argument here:
  async (userId, thunkAPI) => {
    // const response = await fetch(`https://reqres.in/api/users/${userId}`)
    const { data } = await axios(`http://localhost:8080/accounts/${userId}`);
    // Inferred return type: Promise<MyData>
    return data.amount;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1; //immer library
    },
    decrement: (state) => {
      state.amount -= 1;
    },
    incrementByAmount: (state, action) => {
      state.amount += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.amount = action.payload;
        state.pending = false;
      })
      .addCase(getUserAccount.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getUserAccount.rejected, (state, action) => {
        state.error = action.error.message;
        state.pending = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = accountSlice.actions;

export default accountSlice.reducer;
