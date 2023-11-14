import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./userSlice.js";
import { uploadProductSlice } from "./sellerSlice.js";
import { homeProductSlice } from "./homeProductSlice.js";
import logger from "redux-logger";
import { messageSlice } from "./messageSlice.js";
import { productDetail } from "./buyerSlice.js";
import { manageProduct } from "./manageSlice.js";
import { loadProductSlice } from "./loadProductSlice.js";
import { snackbarSlice } from "./snackbarSlice.js";

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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
