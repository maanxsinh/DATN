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
  const Typo = styled(Typography)(({ theme }) => ({
    display: sort,
    justifyContent: "flex-start",
    paddingTop: "10px",
    transition: "all 2s linear",
  }));
  const Div = styled("div")(({ theme }) => ({
    borderBottom: "1px solid #cccccc",
    padding: "20px 0px",
  }));

  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Div style={{ paddingBottom: "20px", borderBottom: "1px solid #cccccc" }}>
        <Typography
          variant="h6"
          sx={{ display: "flex", cursor: "pointer" }}
          onClick={() => handleClick()}>
          Sort by
        </Typography>
        <Typo>Relevance</Typo>
        <Typo>New & Trending</Typo>
        <Typo>Featured</Typo>
      </Div>
      <Div>
        <Typography
          variant="h6"
          sx={{ display: "flex", cursor: "pointer" }}
          onClick={() => handleClick()}>
          Models
        </Typography>
        <Typo>Iphone 15</Typo>
        <Typo>Iphone 14</Typo>
        <Typo>Iphone 13</Typo>
      </Div>
    </Box>
  );
};

export default Sort;
