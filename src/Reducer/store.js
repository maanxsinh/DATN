import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authSlice, editUserSlice, managementSlice } from "./userSlice.js";
import { uploadProductSlice } from "./sellerSlice.js";
import { homeProductSlice } from "./homeProductSlice.js";
import logger from "redux-logger";
import { messageSlice, sendMessageSlice } from "./messageSlice.js";
import {
  createOrdersSlice,
  createPostSlice,
  deliveryAddressSlice,
  getCartSlice,
  getCommentSlice,
  getPostSlice,
  productDetail,
  sendCommentSlice,
} from "./buyerSlice.js";
import { editProductSlice, manageProduct } from "./manageSlice.js";
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
    editProductSlice: editProductSlice.reducer,
    sendMessageSlice: sendMessageSlice.reducer,
    getPostSlice: getPostSlice.reducer,
    sendCommentSlice: sendCommentSlice.reducer,
    getCommentSlice: getCommentSlice.reducer,
    createPostSlice: createPostSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
