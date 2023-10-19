import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuickSec = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const Typo = styled(Typography)(({ theme }) => ({
    padding: "10px",
    cursor: "pointer",
  }));
  const clickSelling = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/upload");
    }
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "var(--lightPink)",
        }}>
        <Typo>iPhone</Typo>
        <Typo>iPad</Typo>
        <Typo>iPhone Cases</Typo>
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          right: 10,
          display: "flex",
          alignItems: "center",
          // backgroundColor: "red",
          textAlign: "center",
        }}>
        <Typo
          sx={{
            borderRight: "1px solid #cccccc",
            height: "25px",
            display: "flex",
            alignItems: "center",
            paddingRight: "20px",
            "&:hover": {
              color: "#db214c",
            },
            // padding: "10px 20px",
          }}
          onClick={() => clickSelling()}>
          Selling
        </Typo>
        <Typo
          sx={{
            margin: "0px 10px",
            "&:hover": {
              color: "#db214c",
            },
          }}>
          Buying
        </Typo>
      </Box>
    </Box>
  );
};

export default QuickSec;
