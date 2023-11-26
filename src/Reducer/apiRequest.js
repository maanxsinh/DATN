import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
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
    console.log("...check product exist:", res.data.isExist);
    if (!res.data.isExist) {
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
    dispatch(getCartSuccess(res.data.cart));
    dispatch(getAuthorArray(res.data.authorArray));
    console.log(">>>>res:", res.data);
  } catch (e) {
    dispatch(getCartFailed());
  }
};

const getDeliveryAddress = async (userId, dispatch) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/getAddressDelivery`,
      {
        params: { userId },
      }
    );
    dispatch(getDeliveryAddressInf(res.data.inf));
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
};
