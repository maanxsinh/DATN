import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authSlice, editUserSlice, managementSlice } from "./userSlice.js";
import { uploadProductSlice } from "./sellerSlice.js";
import { homeProductSlice } from "./homeProductSlice.js";
import logger from "redux-logger";
import { messageSlice } from "./messageSlice.js";
import {
  createOrdersSlice,
  deliveryAddressSlice,
  getCartSlice,
  productDetail,
} from "./buyerSlice.js";
import { manageProduct } from "./manageSlice.js";
import { loadProductSlice } from "./loadProductSlice.js";
import { snackbarSlice } from "./snackbarSlice.js";
import { addToCartSlice } from "./addToCartSlice.js";

const reducerSlice = createSlice({
  name: "store",
  initialState: {},
  reducers: {
    someAction: function () {},
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    uploadProduct: uploadProductSlice.reducer,
    homeProduct: homeProductSlice.reducer,
    reducerSlice: reducerSlice.reducer,
    messageSlice: messageSlice.reducer,
    productDetail: productDetail.reducer,
    manageProduct: manageProduct.reducer,
    loadProductSlice: loadProductSlice.reducer,
    snackbarSlice: snackbarSlice.reducer,
    addToCartSlice: addToCartSlice.reducer,
    getCartSlice: getCartSlice.reducer,
    deliveryAddressSlice: deliveryAddressSlice.reducer,
    manageSlice: managementSlice.reducer,
    editUserSlice: editUserSlice.reducer,
    createOrdersSlice: createOrdersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
