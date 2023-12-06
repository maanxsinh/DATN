import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  managementAction,
} from "./userSlice";
import { uploadFailed, uploadSuccessfull } from "./sellerSlice";
import { loadSuccessfull } from "./homeProductSlice";
import { getError, getProduct, getStart } from "./loadProductSlice";
import { emitter } from "../utils/emitter";
import {
  getAuthorArray,
  getCartFailed,
  getCartStart,
  getCartSuccess,
  getDeliveryAddressInf,
} from "./buyerSlice";

const loginApp = async (email, password, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(res.data));
    console.log(">>> check admin:", res.data.data.typeRole);
    if (res.data.data.typeRole === "R1") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (e) {
    dispatch(loginFailed());
  }
};
// MANAGE REQUEST
const deleteProduct = async (productId, statusId, IdAuthor, dispatch) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/deleteProduct`,
      {
        productId,
      }
    );
    console.log(">>>delete success", res, ">>>>", productId);
    await loadingProduct(statusId, IdAuthor, dispatch);
    emitter.emit("EVENT_DELETE_DATA");
  } catch (e) {}
};

const confirmProduct = async (productId, statusId, IdAuthor, dispatch) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/confirmProduct`,
      {
        productId,
      }
    );
    await loadingProduct(statusId, IdAuthor, dispatch);
    emitter.emit("EVENT_CONFIRM_DATA");
    console.log(">>>confirm success", res);
  } catch (e) {}
};

// ADMIN REQUEST
const editUser = async (data, userId, dispatch) => {
  let res = await axios.post(`${process.env.REACT_APP_PORT_API}/editUser`, {
    data,
    userId,
  });
  const manage = "users";
  console.log("edit user:", res);
  dispatch(managementAction({ manage }));
  return res;
};

const createUser = async (data, dispatch) => {
  let res = await axios.post(`${process.env.REACT_APP_PORT_API}/createUser`, {
    data,
  });
  console.log("edit user:", res);
  const manage = "users";
  dispatch(managementAction({ manage }));
  return res;
};

const deleteUser = async (userId, dispatch) => {
  let res = await axios.post(`${process.env.REACT_APP_PORT_API}/deleteUser`, {
    userId,
  });
  console.log("edit user:", res);
  const manage = "users";
  dispatch(managementAction({ manage }));
  return res;
};

// SELLER REQUEST

const uploadProduct = async (dataPro, dispatch, navigate) => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/upload`, {
      dataPro,
    });
    dispatch(uploadSuccessfull(res.data));
    console.log(res);
  } catch (e) {
    dispatch(uploadFailed());
  }
};

//BUYER REQUEST

const isProductExist = async (data) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/isProductExist`,
      {
        params: { data },
      }
    );
    console.log("...check product exist:", res.data.data);
    if (res.data.data === null) {
      let res = await addToCart(data);
      return "success";
    } else {
      return "product exist: true";
    }
  } catch (e) {}
};

const addToCart = async (data) => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/addToCart`, {
      data,
    });
    console.log("...addToCart:", res);
  } catch (e) {}
};

const getCart = async (ownCartId, dispatch) => {
  dispatch(getCartStart());
  try {
    let res = await axios.get(`${process.env.REACT_APP_PORT_API}/getCart`, {
      params: { ownCartId },
    });
    dispatch(getCartSuccess(res.data.data));
    dispatch(getAuthorArray(res.data.authorArr));
    console.log(">>>>res:", res.data);
  } catch (e) {
    dispatch(getCartFailed());
  }
};

const getDeliveryAddress = async (userId, dispatch) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/getDeliveryAddress`,
      {
        params: { userId },
      }
    );
    dispatch(getDeliveryAddressInf(res.data.data));
    console.log("---delivery address:", res.data.data);
    return res.data.data;
  } catch (e) {}
};

const createOrders = async (data, arrProducts, dispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_PORT_API}/createOrders`, {
      data,
    });
    await axios.post(`${process.env.REACT_APP_PORT_API}/setOrdered`, {
      arrProducts,
    });
  } catch (e) {}
};

const createDeliveryAddress = async (userId, data) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/createDeliveryAddress`,
      {
        userId,
        data,
      }
    );
    console.log("---create delivery address result:", res);
  } catch (e) {}
};

const updateDeliveryAddress = async (userId, data) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/updateDeliveryAddress`,
      {
        userId,
        data,
      }
    );
    console.log("---create delivery address result:", res);
  } catch (e) {}
};

const cancelOrders = async (productId) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/cancelOrders`,
      {
        productId,
      }
    );
    console.log("---cancel orders:", res);
  } catch (e) {}
};

// HOME REQUEST

const loadingProduct = async (statusId, IdAuthor, dispatch) => {
  dispatch(getStart());
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/loadingProduct`,
      { params: { statusId, IdAuthor } }
    );
    // console.log(">>>san pham:", res.data.data);
    dispatch(getProduct(res.data.data));
  } catch (e) {
    dispatch(getError());
  }
};

export {
  loginApp,
  uploadProduct,
  loadingProduct,
  deleteProduct,
  confirmProduct,
  isProductExist,
  addToCart,
  getCart,
  getDeliveryAddress,
  editUser,
  createUser,
  deleteUser,
  createOrders,
  createDeliveryAddress,
  updateDeliveryAddress,
  cancelOrders,
};
