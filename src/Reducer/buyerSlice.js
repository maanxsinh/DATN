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
      console.log("FULFILLED:", state.data);
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

const getPostSlice = createSlice({
  name: "getPost",
  initialState: {
    isLoading: false,
    error: false,
    post: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getPostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload.data.data.reverse();
      console.log("FULFILLED");
    });
    builder.addCase(getPostThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const getPostThunk = createAsyncThunk("getPost", async (authorId) => {
  const res = await axios.get(`${process.env.REACT_APP_PORT_API}/getPost`, {
    params: { authorId },
  });
  console.log(">>>du lieu:", res);
  return res;
});

const sendCommentSlice = createSlice({
  name: "sendComment",
  initialState: {
    comment: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    setPostId: (state, action) => {
      state.comment.postId = action.payload;
    },
    setOwnerCommentId: (state, action) => {
      state.comment.ownerCommentId = action.payload;
    },
    setContent: (state, action) => {
      state.comment.content = action.payload;
    },
    setTimeComment: (state, action) => {
      state.comment.timeComment = action.payload;
    },
    resetContent: (state, action) => {
      state.comment.content = "";
      state.comment.timeComment = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCommentThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(sendCommentThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED");
    });
    builder.addCase(sendCommentThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const sendCommentThunk = createAsyncThunk(
  "sendCommentThunk",
  async (comment) => {
    const res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/sendComment`,
      {
        comment,
      }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);

const getCommentSlice = createSlice({
  name: "getComment",
  initialState: {
    commentData: {},
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getCommentThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentData = action.payload.data.data;
      console.log("FULFILLED");
    });
    builder.addCase(getCommentThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const getCommentThunk = createAsyncThunk(
  "getCommentThunk",
  async (postId) => {
    const res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/getComment`,
      {
        params: { postId },
      }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);
const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    post: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    setAuthorId: (state, action) => {
      state.post.authorId = action.payload;
    },
    setContentPost: (state, action) => {
      state.post.content = action.payload;
    },
    setTimePost: (state, action) => {
      state.post.timePost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPostThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED");
    });
    builder.addCase(createPostThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const createPostThunk = createAsyncThunk(
  "createPostThunk",
  async (post) => {
    const res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/createPost`,
      {
        post,
      }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);

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
export const {
  setPostId,
  setOwnerCommentId,
  setContent,
  setTimeComment,
  resetContent,
} = sendCommentSlice.actions;

export const { setAuthorId, setContentPost, setTimePost } =
  createPostSlice.actions;
export {
  productDetail,
  getCartSlice,
  deliveryAddressSlice,
  createOrdersSlice,
  getPostSlice,
  sendCommentSlice,
  getCommentSlice,
  createPostSlice,
};
