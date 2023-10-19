import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const Products = () => {
  const Div = styled("div")(({ theme }) => ({
    textAlign: "center",
    height: "360px",
    maxWidth: "265px",
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: "360px",
    maxWidth: "265px",
    color: theme.palette.text.secondary,
  }));
  const Typo = styled(Typography)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
  }));
  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Div>
            <img
              src="https://cdn.viettelstore.vn/Images/Product/ProductImage/291703442.jpeg"
              alt="Girl in a jacket"
              width="500"
              height="600"
              style={{ width: "265px", height: "265px" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typo
                sx={{ display: "flex", justifyContent: "flex-start" }}
                variant="subtitle2"
                display="block"
                gutterBottom>
                IPHONE
              </Typo>
              <Typo
                sx={{ marginTop: "-5px", fontSize: "18px", fontWeight: "500" }}
                variant="h6"
                display="block"
                gutterBottom>
                IPHONE 12 PRO MAX
              </Typo>
              <Typo
                sx={{ marginTop: "-10px" }}
                variant="subtitle2"
                display="block"
                gutterBottom>
                by{" "}
                <a
                  href="https://www.w3schools.com"
                  style={{ margin: "0px 5px", textDecoration: "underline" }}>
                  Man Van Sinh
                </a>
              </Typo>
              <Typo variant="button" display="block" gutterBottom>
                $29.00
              </Typo>
            </Box>
          </Div>
        </Grid>
        <Grid xs={3}>
          <Div>
            <img
              src="https://ctl.s6img.com/society6/img/O-xhwWz8n2nkN53cUtLYHPecJGc/h_264,w_264/cases/iphone15/slim/back/~artwork,fw_1300,fh_2001,fx_-557,iw_2000,ih_2000/s6-original-art-uploads/society6/uploads/misc/c7fcf244c41e4607bf2b32356f8469f1/~~/amber-dusk917398-cases.jpg?attempt=0"
              alt="Girl in a jacket"
              width="500"
              height="600"
              style={{ width: "265px", height: "265px" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typo
                sx={{ display: "flex", justifyContent: "flex-start" }}
                variant="subtitle2"
                display="block"
                gutterBottom>
                IPHONE
              </Typo>
              <Typo
                sx={{ marginTop: "-5px", fontSize: "18px", fontWeight: "500" }}
                variant="h6"
                display="block"
                gutterBottom>
                IPHONE 12 PRO MAX
              </Typo>
              <Typo
                sx={{ marginTop: "-10px" }}
                variant="subtitle2"
                display="block"
                gutterBottom>
                by{" "}
                <a
                  href="https://www.w3schools.com"
                  style={{ margin: "0px 5px", textDecoration: "underline" }}>
                  Man Van Sinh
                </a>
              </Typo>
              <Typo variant="button" display="block" gutterBottom>
                $29.00
              </Typo>
            </Box>
          </Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=4</Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=8</Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=8</Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=4</Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=4</Div>
        </Grid>
        <Grid xs={3}>
          <Div>xs=8</Div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
