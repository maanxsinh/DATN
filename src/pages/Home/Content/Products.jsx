import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { homeProduct } from "../../../Reducer/apiRequest";
import { loadingProduct } from "../../../Reducer/homeProductSlice";
import { Buffer } from "buffer";
import commonUtils from "../../../utils/commonUtils";

window.Buffer = Buffer;

const Products = () => {
  const [imageShow, setImageShow] = useState(null);
  const productInf = useSelector((state) => state.homeProduct.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      const sortBy = "iPhone";
      const inf = dispatch(loadingProduct({ sortBy }));
    };
    fetchProduct();
    // const image = productInf[3].image.data;
    // const base64String = new Buffer(image, "base64").toString("binary");
    // setImageShow(base64String);
    // console(">>>PORDUCT INF:", productInf);
  }, []);

  const handleOnClick = async () => {
    // const image = productInf.product[3].image.data;
    // const base64String = new Buffer(image, "base64").toString("binary");
    // setImageShow(base64String);
    // console.log("...san pham...:", imageShow);
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(image)));
    // const base64 = await commonUtils.bufferToBase64(image);
  };
  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Grid container spacing={2}>
        {productInf &&
          productInf.length > 0 &&
          productInf.map((item) => {
            return (
              <Grid xs={3}>
                <Div>
                  <img
                    src={item.imageToBase64}
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
                    {/* <Typo
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      variant="subtitle2"
                      display="block"
                      gutterBottom>
                      {item.sort}
                    </Typo> */}
                    <Typo
                      sx={{
                        marginTop: "-5px",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                      variant="h6"
                      display="block"
                      gutterBottom>
                      {item.name}
                    </Typo>
                    <Typo
                      sx={{ marginTop: "-10px" }}
                      variant="subtitle2"
                      display="block"
                      gutterBottom>
                      by{" "}
                      <a
                        href="https://www.w3schools.com"
                        style={{
                          margin: "0px 5px",
                          textDecoration: "underline",
                        }}>
                        {item.User.fullName}
                      </a>
                    </Typo>
                    <Typo variant="button" display="block" gutterBottom>
                      {item.price}
                    </Typo>
                  </Box>
                </Div>
              </Grid>
            );
          })}

        <Grid xs={3}></Grid>
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
