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

const homeProduct = async (sortBy, dispatch) => {
  // dispatch(loadStart());
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/loadingProduct`,
      { params: { sortBy } }
    );
    if (res) {
      console.log(">>>san pham:", res.data.product);
    }
    dispatch(loadSuccessfull(res));
  } catch (e) {
    // dispatch(loadError());
  }
};

export { loginApp, uploadProduct, homeProduct };
