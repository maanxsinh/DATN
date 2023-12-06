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
    role: null,
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
    setRoleAdmin: (state) => {
      state.role = "admin";
    },
    setRoleBuyer: (state) => {
      state.role = "buyer";
    },
    setRoleSeller: (state) => {
      state.role = "seller";
    },
    setRole: (state, action) => {
      state.role = action.payload;
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
  async ({ manage, role, userId, statusName }) => {
    if (manage === "users") {
      let res = await axios.get(
        `${process.env.REACT_APP_PORT_API}/getUsers`,
        {}
      );
      console.log("---check res:", res);
      // let res = "abc";
      return res;
    } else if (manage === "products") {
      let res = await axios.get(
        `${process.env.REACT_APP_PORT_API}/loadingProduct`,
        { params: {} }
      );
      return res;
    } else if (manage === "orders") {
      console.log(">>>role:", role);
      let res = await axios.get(`${process.env.REACT_APP_PORT_API}/getOrders`, {
        params: { role, userId, statusName },
      });
      console.log(">>>orders:", res.data.data);
      const arr = res.data.data;
      if (arr && arr.length > 0) {
        arr.map((item) => {
          item.Product.imageToBase64 = new Buffer(
            item.Product.image.data,
            "base64"
          ).toString("binary");
          return item;
        });
      }
      return res;
    }
  }
);

const editUserSlice = createSlice({
  name: "edit user",
  initialState: {
    userId: null,
    data: {
      typeRole: "R2",
    },
    isLoading: false,
    error: false,
  },
  reducers: {
    editFullName: (state, action) => {
      state.data.fullName = action.payload;
    },
    editEmail: (state, action) => {
      state.data.email = action.payload;
    },
    editPhoneNumber: (state, action) => {
      state.data.phoneNumber = action.payload;
    },
    editGender: (state, action) => {
      state.data.gender = action.payload;
    },
    editAddress: (state, action) => {
      state.data.address = action.payload;
    },
    editPassword: (state, action) => {
      state.data.password = action.payload;
    },
    editTypeRole: (state, action) => {
      state.data.typeRole = action.payload;
    },
    getUserIdEdit: (state, action) => {
      state.userId = action.payload;
    },
    resetData: (state, action) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUserThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(editUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      console.log("FULFILLED");
    });
    builder.addCase(editUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

export const editUserThunk = createAsyncThunk(
  "admin/edit-user",
  async (data, userId) => {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/editUser`, {
      data,
      userId,
    });
    console.log("edit user:", res);
    return res;
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

export const {
  getUsers,
  getProducts,
  getOrders,
  setRoleAdmin,
  setRoleBuyer,
  setRoleSeller,
  setRole,
} = managementSlice.actions;
export const {
  editAddress,
  editEmail,
  editFullName,
  editGender,
  editPhoneNumber,
  editPassword,
  editTypeRole,
  getUserIdEdit,
  resetData,
} = editUserSlice.actions;

export { authSlice, managementSlice, editUserSlice };
