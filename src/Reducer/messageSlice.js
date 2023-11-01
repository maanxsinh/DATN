import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    showMessage: false,
  },
  reducers: {
    showMessage: (state) => {
      state.showMessage = true;
    },
    hiddenMessage: (state) => {
      state.showMessage = false;
    },
  },
});

export const { showMessage, hiddenMessage } = messageSlice.actions;

export { messageSlice };
