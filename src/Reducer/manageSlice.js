import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const manageProduct = createSlice({
  name: "detail",
  initialState: {
    arrayProductId: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    // pushProductId: (state, action) => {
    //   const isPresent = state.arrayProductId.includes(action.payload);
    //   if (isPresent === false) {
    //     state.arrayProductId.push(action.payload);
    //   }

    //   console.log(">>>arrayProductId:", state.arrayProductId);
    // },
    // removeProductId: (state, action) => {
    //   const isPresent = state.arrayProductId.includes(action.payload);
    //   if (isPresent === true) {
    //     state.arrayProductId = state.arrayProductId.filter(
    //       (item) => item !== action.payload
    //     );
    //   }
    // },
    saveArrayProduct: (state, action) => {
      state.arrayProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(confirmProduct.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(confirmProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED");
    });
    builder.addCase(confirmProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const confirmProduct = createAsyncThunk(
  "load/confirm",
  async (arrayProductId) => {
    const res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/confirmProduct`,
      { arrayProductId }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);

export const { pushProductId, removeProductId, saveArrayProduct } =
  manageProduct.actions;

export { manageProduct };
