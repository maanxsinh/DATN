import React, { useEffect, useRef, useState } from "react";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginApp } from "../../Reducer/apiRequest";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import {
  editAddress,
  editEmail,
  editFullName,
  editGender,
  editImage,
  editPassword,
  editPhoneNumber,
  resetData,
} from "../../Reducer/userSlice";
import commonUtils, { setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../../components/Snackbar";

const Login = () => {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [productImg, setProductImg] = useState({ imgURL: null, image: null });
  const dataUser = useSelector((state) => state.editUserSlice.data);
  const [isExist, setIsExist] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const data = useSelector((state) => state.auth.login.currentUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    await loginApp(email, password, dispatch, navigate);
    console.log("reps:", data);
    setIsWrong(data?.isWrong);
  };
  const signUpButton = () => {
    setIsContainerActive(true);
    console.log("right-panel-active");
  };
  const signInButton = () => {
    setIsContainerActive(false);
  };

  const handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await commonUtils.getBase64(file);
      dispatch(editImage(base64));
      let objectUrl = URL.createObjectURL(file);
      setProductImg({
        imgURL: objectUrl,
        image: file,
      });
      // console.log(">>> IMAGE", base64);
      // console.log(">>> IMAGE", objectUrl);
    }
  };

  const handleSignUp = async () => {
    console.log("data create user:", dataUser);

    if (
      !dataUser.email ||
      !dataUser.password ||
      !dataUser.fullName ||
      !dataUser.address ||
      !dataUser.phoneNumber ||
      !dataUser.gender ||
      !dataUser.image
    ) {
      setIsEmpty(true);
      setSnackbar("warning", "Please fill in all fields", dispatch);
    } else {
      const check = await createUser(dataUser, null, dataUser?.email);
      console.log("check exist:", check.data.data);
      if (check.data.data === true) {
        setIsExist(true);
      } else {
        setSnackbar("success", "Sign up successfull", dispatch);
        setIsContainerActive(false);
        dispatch(resetData());
      }
    }
  };

  return (
    <div className="root">
      {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
      <div
        className={`container${isContainerActive ? " right-panel-active" : ""}`}
        id="container">
        <SnackbarComponent />
        <div className="form-container sign-up-container">
          <div className="sign-up-form">
            <h1 style={{ marginTop: "15px" }}>Create Account</h1>
            <div className="social-container" style={{ margin: "10px 0" }}>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              value={dataUser?.email}
              type="email"
              placeholder="Email"
              onChange={(e) => {
                dispatch(editEmail(e.target.value));
                setIsExist(false);
                setIsEmpty(false);
              }}
              style={
                isExist ||
                (isEmpty && dataUser?.email === "") ||
                (isEmpty && !dataUser?.email)
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            {isExist && (
              <div style={{ fontSize: "10px", color: "red" }}>
                Email is existed
              </div>
            )}

            <input
              value={dataUser?.password}
              type="password"
              placeholder="Password"
              onChange={(e) => {
                dispatch(editPassword(e.target.value));
                setIsEmpty(false);
              }}
              style={
                isEmpty && (dataUser?.password === "" || !dataUser?.password)
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <input
              value={dataUser?.fullName}
              type="text"
              placeholder="Full Name"
              onChange={(e) => {
                dispatch(editFullName(e.target.value));
                setIsEmpty(false);
              }}
              style={
                isEmpty && (dataUser?.fullName === "" || !dataUser?.fullName)
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <input
              value={dataUser?.address}
              type="text"
              placeholder="Address"
              onChange={(e) => {
                dispatch(editAddress(e.target.value));
                setIsEmpty(false);
              }}
              style={
                isEmpty && (dataUser?.address === "" || !dataUser?.address)
                  ? { border: "1px solid red" }
                  : {}
              }
            />
            <input
              value={dataUser?.phoneNumber}
              type="text"
              placeholder="Phone Number"
              onChange={(e) => {
                dispatch(editPhoneNumber(e.target.value));
                setIsEmpty(false);
              }}
              style={
                isEmpty &&
                (dataUser?.phoneNumber === "" || !dataUser?.phoneNumber)
                  ? { border: "1px solid red" }
                  : {}
              }
            />

            <Box sx={{ display: "flex", marginBottom: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  marginLeft: "-40px",
                }}>
                <Select onChange={(e) => dispatch(editGender(e.target.value))}>
                  <option value={null}></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                <Label for="file">Image</Label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => handleOnchangeFile(e)}
                />
              </Box>
              <div
                style={{
                  marginLeft: "20px",
                  borderRadius: "6px",
                  height: "93.78px",
                  width: "93.78px",
                }}>
                {productImg.imgURL !== null && (
                  <img
                    src={productImg.imgURL === null ? "" : productImg.imgURL}
                    alt="img"
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "6px",
                      // border: "1px solid red",
                    }}
                  />
                )}
              </div>
            </Box>

            <button onClick={() => handleSignUp()}>Sign Up</button>
          </div>
        </div>
        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                handleChangeEmail(e);
                setIsWrong(false);
              }}
              style={isWrong ? { border: "1px solid red" } : {}}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                handleChangePassword(e);
                setIsWrong(false);
              }}
              style={isWrong ? { border: "1px solid red" } : {}}
            />
            {isWrong && (
              <div style={{ fontSize: "10px", color: "red" }}>
                Email or password is wrong
              </div>
            )}
            <a href="#">Forgot your password?</a>
            <button onClick={() => handleLogin()}>Sign In</button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => signInButton()}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => signUpButton()}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="https://florin-pop.com">
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">
            here
          </a>
          .
        </p>
      </footer> */}
    </div>
  );
};

export default Login;

const Select = styled("select")(({ theme }) => ({
  fontSize: "14px",
  border: "none",
  outline: "none",
  padding: "1px 2px ",
  backgroundColor: "rgba(0,0,0,0.06)",
  width: "123px",
  height: "36px",
  marginLeft: "-7px",
  // margin: "0px",
  // padding: "12px 0 0 15px",
}));

const Label = styled("label")(({ theme }) => ({
  fontSize: "14px",
  display: "inline-block",
  border: "1px dashed #999",
  padding: "10px",
  borderRadius: "6px",
  margin: "5px 0 0 -5px",
  "&:hover": {
    border: "1px dashed #de0611",
    color: "#de0611",
  },
}));
