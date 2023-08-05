import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  updateCartQty,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

/*export const fetchAsync = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();

  return response.data;
});

export const addAsync = createAsyncThunk("cart/addItem", async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });

  return response.data;
});

export const deleteAsync = createAsyncThunk("cart/deleteItem", async (id) => {
  await deleteItem(id);

  return id;
});

export const updateAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItem(id, change);

    return response.data;
  }
);

export const updateCartQtyAsync = createAsyncThunk(
  "cart/updateCartQty",
  async ({ id, change }) => {
    const response = await updateCartQty(id, change);

    return response.data;
  }
);*/

export const fetchAsync = createAction("cart/fetchItems/pending");
export const fetchAsyncFulfilled = createAction("cart/fetchItems/fulfilled");
export const addAsync = createAction("cart/addItems/fulfilled");
export const updateAsync = createAction("cart/updateItems/fulfilled");
export const deleteAsync = createAction("cart/deleteItems/fulfilled");
export const updateCartQtyAsync = createAction("cart/updateCartQtyAsync/fulfilled");

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncFulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsync, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteAsync, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsync, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

export default cartSlice.reducer;
