import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      err: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    //login
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      console.log(">>>Check state currentUser", state.login.currentUser);
    },
    loginFailed: (state) => {
      state.login.error = true;
    },
    //log out
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.login.currentUser = null;
      console.log(state.login.currentUser);
    },
    logoutFailed: (state) => {
      state.logout.error = true;
    },
  },
});

//Admin service

const managementSlice = createSlice({
  name: "managementSlice",
  initialState: {
    manage: null,
    data: null,
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
    getUsers: (state, action) => {
      state.manage = "users";
      state.isLoading = false;
      state.error = false;
      state.data = action.payload;
    },
    getProducts: (state, action) => {
      state.manage = "products";
      state.isLoading = false;
      state.error = false;
      state.data = action.payload;
    },
    getOrders: (state, action) => {
      state.manage = "orders";
      state.isLoading = false;
      state.error = false;
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(managementAction.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(managementAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.data;
      console.log("FULFILLED:", state.data);
    });
    builder.addCase(managementAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const managementAction = createAsyncThunk(
  //action name
  "admin/management",
  async (manage, dispatch) => {
    if (manage === "users") {
      let res = await axios.get(
        `${process.env.REACT_APP_PORT_API}/getUsers`,
        {}
      );
      // let res = "abc";
      return res;
    } else if (manage === "products") {
      let res = await axios.get(
        `${process.env.REACT_APP_PORT_API}/loadingProduct`,
        { params: {} }
      );
      return res;
    } else if (manage === "orders") {
      let res = await axios.get(
        `${process.env.REACT_APP_PORT_API}/getOrders`,
        {}
      );
      return res;
    }
  }
);

export const {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export const { getUsers, getProducts, getOrders } = managementSlice.actions;

export { authSlice, managementSlice };
