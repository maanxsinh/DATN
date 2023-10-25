import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./userSlice.js";
import { uploadProductSlice } from "./sellerSlice.js";
import { homeProductSlice } from "./homeProductSlice.js";
import logger from "redux-logger";

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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
