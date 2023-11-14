import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const homeProductSlice = createSlice({
  name: "homeProduct",
  initialState: {
    product: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    // loadStart: (state) => {
    //   state.isFetching = true;
    // },
    // loadError: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    loadSuccessfull: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadingProduct.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(loadingProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      // state.product.map((item) => {
      //   item.imageToBase64 = new Buffer(item.image.data, "base64").toString(
      //     "binary"
      //   );
      //   return item;
      // });
      // console.log("FULFILLED", { state, action });
      console.log("SAN PAHM:", state.product);
    });
    builder.addCase(loadingProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const loadingProduct = createAsyncThunk(
  "load/product",
  async (sortBy, authorId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/loadingProduct`,
      { params: { sortBy, authorId } }
    );
    return res;
  }
);

export const { loadSuccessfull } = homeProductSlice.actions;

export { homeProductSlice };
