import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productDetail = createSlice({
  name: "detail",
  initialState: {
    id: null,
    data: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    idProduct: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadingProductDetail.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(loadingProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.data;
      state.data.imageToBase64 = new Buffer(
        state.data.image.data,
        "base64"
      ).toString("binary");
      console.log(">>>data:", state.data);
    });
    builder.addCase(loadingProductDetail.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const loadingProductDetail = createAsyncThunk(
  "load/productDetail",
  async (id) => {
    const ID = "5";
    const res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/productDetail`,
      { params: { id } }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);

export const { idProduct } = productDetail.actions;

export { productDetail };
