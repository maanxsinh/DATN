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

const loginApp = async (email, password, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/login`, {
      email,
      password,
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
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

// HOME REQUEST

const loadingProduct = async (statusId, IdAuthor, dispatch) => {
  dispatch(getStart());
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/loadingProduct`,
      { params: { statusId, IdAuthor } }
    );
    console.log(">>>san pham:", res.data.data);
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
};
