import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: null,
    showMessage: false,
    showAll: false,
  },
  reducers: {
    showMessage: (state) => {
      state.showMessage = true;
    },
    hiddenMessage: (state) => {
      state.showMessage = false;
    },
    showAllMessage: (state) => {
      state.showAll = true;
    },
    hiddenAll: (state) => {
      state.showAll = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversation.pending, (state) => {
      // state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getAllConversation.fulfilled, (state, action) => {
      state.data = action.payload.data.data;
      // state.isLoading = false;
      // state.data.imageToBase64 = new Buffer(
      //   state.data.image.data,
      //   "base64"
      // ).toString("binary");
      console.log(">>>data:", state.data);
    });
    builder.addCase(getAllConversation.rejected, (state) => {
      // state.isLoading = false;
      // state.error = true;
      console.log("REJECTED");
    });
  },
});

export const getAllConversation = createAsyncThunk(
  "load/allConversation",
  async (currentUserId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/getAllConversation`,
      { params: { currentUserId } }
    );

    console.log(">>>res:", res);
    return res;
  }
);

export const { showMessage, hiddenMessage, showAllMessage, hiddenAll } =
  messageSlice.actions;

export { messageSlice };
