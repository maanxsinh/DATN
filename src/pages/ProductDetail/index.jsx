import Box from "@mui/material/Box";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const ProductDetail = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid sx={5}>
            <Item>xs=8</Item>
          </Grid>
          <Grid sx={5}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetail;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
