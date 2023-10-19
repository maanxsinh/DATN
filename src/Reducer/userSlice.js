import { createSlice } from "@reduxjs/toolkit";

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

export const {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export { authSlice };
