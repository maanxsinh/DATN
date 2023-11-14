import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    openSnackbar: false,
    snackbarMessage: "",
  },
  reducers: {
    openSbTrue: (state) => {
      state.openSnackbar = true;
    },
    openSbFalse: (state) => {
      state.openSnackbar = false;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
  },
});

export const { openSbTrue, openSbFalse, setSnackbarMessage } =
  snackbarSlice.actions;

export { snackbarSlice };
