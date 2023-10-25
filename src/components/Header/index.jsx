import React, { useEffect, useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import QuickSec from "./QuickSec";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState("search");
  const onFocus = () => {
    setFocus("search-focus");
    console.log(">>>>FOCUS");
  };
  const onBlur = () => {
    setFocus("search");
    console.log(">>> BLUR");
  };
  const [age, setAge] = React.useState("");

  const userInf = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    console.log(">>> USER INF", userInf);
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="Header-QuickSec">
      <div className="Header">
        <div className="logo">logo</div>
        <div
          className="home"
          onClick={() => {
            navigate("/");
          }}>
          HOME
        </div>
        <div className={focus}>
          <input
            className="input"
            type="text"
            placeholder="Find somthing you'll love"
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
          />
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </div>
        <div className="support">SUPPORT</div>
        <div className="blog">BLOG</div>
        <div className="acc-cart">
          <FormControl sx={{ m: 1, minWidth: 127, fontSize: "5px" }}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: "35px !important",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontSize: "12px",
              }}>
              <MenuItem value={20}>
                {/* <img
                  alt="En"
                  src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
                  style={{
                    maxHeight: "20px",
                    maxWidth: "20px",
                    marginRight: "5px",
                  }}
                /> */}
                English
              </MenuItem>
              <MenuItem value={10}>
                {/* <img
                  alt="Vi"
                  src="https://static.vecteezy.com/system/resources/previews/016/328/942/original/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png"
                  style={{
                    maxHeight: "20px",
                    maxWidth: "20px",
                    marginRight: "5px",
                  }}
                /> */}
                Tiếng Việt
              </MenuItem>
            </Select>
          </FormControl>
          <div className="account">
            <HiOutlineUser
              style={{
                fontSize: "27px",
                margin: "0px 15px",
                cursor: "pointer",
              }}
            />
            {userInf === null ? (
              <div className="pop-up">
                <div
                  onClick={() => {
                    navigate("/login");
                  }}>
                  Login
                </div>
                <div>Sign up</div>
              </div>
            ) : (
              <div className="pop-up">
                <div>My account</div>
                <div>Log out</div>
              </div>
            )}
          </div>
          <div className="cart">
            <PiShoppingCartSimple
              style={{ fontSize: "27px", marginRight: "10px" }}
            />
          </div>
        </div>
      </div>
      <div className="QuickSec">
        <QuickSec />
      </div>
    </div>
  );
};

export default Header;
