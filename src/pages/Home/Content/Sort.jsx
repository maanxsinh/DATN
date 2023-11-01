import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Sort = () => {
  const [sort, setSort] = useState("none");
  const handleClick = () => {
    setSort("flex");
    if (sort === "flex") {
      setSort("none");
    }
  };
  const Typo13 = styled(Typography)(({ theme }) => ({
    display: sort,
    justifyContent: "flex-start",
    paddingTop: "10px",
    transition: "all 2s linear",
    fontSize: "13px",
    color: "black",
  }));

  const Typo17 = styled(Typography)(({ theme }) => ({
    fontSize: "17px",
    color: "black",
    fontWeight: "500",
  }));

  const Div = styled("div")(({ theme }) => ({
    borderBottom: "1px solid #cccccc",
    padding: "20px 0px",
  }));

  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Div style={{ paddingBottom: "20px", borderBottom: "1px solid #cccccc" }}>
        <Typo17
          sx={{ display: "flex", cursor: "pointer", fontSize: "17px" }}
          onClick={() => handleClick()}>
          Sort by
        </Typo17>
        <Typo13>Relevance</Typo13>
        <Typo13>New & Trending</Typo13>
        <Typo13>Featured</Typo13>
      </Div>
      <Div>
        <Typo17
          sx={{ display: "flex", cursor: "pointer" }}
          onClick={() => handleClick()}>
          Models
        </Typo17>
        <Typo13>Iphone 15</Typo13>
        <Typo13>Iphone 14</Typo13>
        <Typo13>Iphone 13</Typo13>
      </Div>
    </Box>
  );
};

export default Sort;
