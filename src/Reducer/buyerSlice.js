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

const getCartSlice = createSlice({
  name: "getCart",
  initialState: {
    cart: [],
    isLoading: false,
    error: false,
    authorArr: [],
  },
  reducers: {
    getCartStart: (state) => {
      state.isLoading = true;
    },
    getCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.cart.map((item) => {
        item.imageToBase64 = new Buffer(
          item.Product.image.data,
          "base64"
        ).toString("binary");
        return item;
      });
      // console.log("action.payload:", state.cart[0].Product.image.data);
    },
    getCartFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    getAuthorArray: (state, action) => {
      state.authorArr = action.payload;
    },
  },
});

const deliveryAddressSlice = createSlice({
  name: "delivery address",
  initialState: {
    deliveryAddress: null,
    data: {},
  },
  reducers: {
    getDeliveryAddressInf: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setEmail: (state, action) => {
      state.data.email = action.payload;
    },
    setFullName: (state, action) => {
      state.data.fullName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.data.phoneNumber = action.payload;
    },
    setAddress: (state, action) => {
      state.data.address = action.payload;
    },
    setUserId: (state, action) => {
      state.data.userId = action.payload;
    },
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

const createOrdersSlice = createSlice({
  name: "create orders",
  initialState: {
    ordersArr: [],
    ProductsArr: [],
  },
  reducers: {
    setOrdersArray: (state, action) => {
      state.ordersArr = action.payload;
    },
    setProductsArr: (state, action) => {
      state.ProductsArr = action.payload;
    },
  },
});

export const { idProduct } = productDetail.actions;
export const { getCartStart, getCartSuccess, getCartFailed, getAuthorArray } =
  getCartSlice.actions;
export const {
  getDeliveryAddressInf,
  setAddress,
  setEmail,
  setFullName,
  setPhoneNumber,
  setUserId,
} = deliveryAddressSlice.actions;
export const { setOrdersArray, setProductsArr } = createOrdersSlice.actions;
export { productDetail, getCartSlice, deliveryAddressSlice, createOrdersSlice };
