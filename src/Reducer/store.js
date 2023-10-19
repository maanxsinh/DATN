import { createSlice, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./userSlice.js";
import { uploadProductSlice } from "./sellerSlice.js";

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
    reducerSlice: reducerSlice.reducer,
  },
});

export default store;
