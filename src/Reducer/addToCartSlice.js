import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    productInCart: null,
  },
  reducers: {
    setProductToAdd: (state, action) => {
      state.productInCart = action.payload;
    },
  },
});

export const { setProductToAdd } = addToCartSlice.actions;

export { addToCartSlice };
