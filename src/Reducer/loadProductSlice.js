import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadProductSlice = createSlice({
  name: "loadProduct",
  initialState: {
    product: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    getStart: (state) => {
      state.isLoading = true;
    },
    getError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    getProduct: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.product = action.payload;
      state.product.map((item) => {
        item.imageToBase64 = new Buffer(item.image.data, "base64").toString(
          "binary"
        );
        return item;
      });
      console.log("get Product", state.product);
    },
    extraReducers: (builder) => {
      builder.addCase(loadingProductThunk.pending, (state) => {
        state.isLoading = true;
        console.log("PENDING");
      });
      builder.addCase(loadingProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        // state.product.map((item) => {
        //   item.imageToBase64 = new Buffer(item.image.data, "base64").toString(
        //     "binary"
        //   );
        //   return item;
        // });
        // console.log("FULFILLED", { state, action });
        console.log(">>>>FULFILLED");
        console.log("SAN PAHM:", state.product);
      });
      builder.addCase(loadingProductThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        console.log("REJECTED");
      });
    },
  },
});

export const loadingProductThunk = createAsyncThunk(
  "loading/Product",
  async (statusId, IdAuthor) => {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/loadingProduct`,
      { params: { statusId, IdAuthor } }
    );
    if (res) {
      console.log(">>>san pham:", res);
    }
    return res;
  }
);

export const { getProduct, getStart, getError } = loadProductSlice.actions;

export { loadProductSlice };
