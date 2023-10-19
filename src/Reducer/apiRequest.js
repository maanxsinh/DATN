import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
} from "./userSlice";
import { uploadFailed, uploadSuccessfull } from "./sellerSlice";

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

const uploadProduct = async (productInf, dispatch, navigate) => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/upload`, {
      productInf,
    });
    dispatch(uploadSuccessfull(res.data));
  } catch (e) {
    dispatch(uploadFailed());
  }
};

export { loginApp };
