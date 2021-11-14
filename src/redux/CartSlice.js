import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    numItems: 0,
    cartValue: 0,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.cartValue = action.payload.cartAmount;
      state.numItems = action.payload.numItems;
      state.totalQuantity = action.payload.totalQuantity;

    },
    addItemToCart(state, action) {
      state.items = action.payload.items;
      state.cartValue = action.payload.cartValue;
      state.numItems = state.items.length;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = true;
    },
    addItemQuantityInCart(state, action) {
      state.items = action.payload.items;
      state.cartValue = action.payload.cartValue;
      state.numItems = state.items.length;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = true;
    },
    reduceItemQuantityInCart(state, action) {
      state.items = action.payload.items;
      state.cartValue = action.payload.cartValue;
      state.numItems = state.items.length;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = true;
    },
    deleteItemFromCart(state, action) {
      state.items = action.payload.items;
      state.cartValue = action.payload.cartValue;
      state.numItems = state.items.length;
      state.totalQuantity = action.payload.totalQuantity;
      state.changed = true;
    },
  },
});

export const cartActions = CartSlice.actions;

export default CartSlice;
