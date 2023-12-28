import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: null,
    showMessage: false,
    showAll: false,
    dataMessage: null,
    isLoading: false,
    error: false,
    partner: null,
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
    setPartner: (state, action) => {
      state.partner = action.payload;
    },
    setArrDataMessage: (state, action) => {
      if (state.dataMessage && state.dataMessage.length > 0) {
        state.dataMessage = [...state.dataMessage, action.payload];
      }
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

    //---------GET MESSAGE
    builder.addCase(getMessage.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataMessage = action.payload.data.data;
      if (state.dataMessage && state.dataMessage.length > 0) {
        state.dataMessage.map((item) => {
          let dateSource = new Date(item.createdAt);

          let formatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };
          item.timeSendMessage = dateSource.toLocaleDateString(
            "en-US",
            formatOptions
          );
          return item;
        });
      }
      console.log(">>>data:", state.dataMessage);
    });
    builder.addCase(getMessage.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
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

    return res;
  }
);

export const getMessage = createAsyncThunk(
  "getMessage",
  async ({ conversationId, userId }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/getMessage`,
      { params: { conversationId, userId } }
    );
    console.log("get message:", res);
    return res;
  }
);

const sendMessageSlice = createSlice({
  name: "send message",
  initialState: {
    dataSend: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    setMessage: (state, action) => {
      state.dataSend.content = action.payload;
    },
    setConversationId: (state, action) => {
      state.dataSend.conversationId = action.payload;
    },
    setSenderId: (state, action) => {
      state.dataSend.senderId = action.payload;
    },
    setReceiverId: (state, action) => {
      state.dataSend.receiverId = action.payload;
    },
    setTimeSend: (state, action) => {
      state.dataSend.timeSend = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const sendMessageThunk = createAsyncThunk(
  "send-message",
  async (dataMessage) => {
    const res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/sendMessage`,
      { dataMessage }
    );
    console.log("send message:", res);
    return res;
  }
);

export const {
  showMessage,
  hiddenMessage,
  showAllMessage,
  hiddenAll,
  setPartner,
  setArrDataMessage,
} = messageSlice.actions;

export const {
  setMessage,
  setConversationId,
  setSenderId,
  setReceiverId,
  setTimeSend,
} = sendMessageSlice.actions;

export { messageSlice, sendMessageSlice };
