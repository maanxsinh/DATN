import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { homeProduct } from "../../../Reducer/apiRequest";
import { loadingProduct } from "../../../Reducer/apiRequest";
import {
  getProduct,
  loadingProductThunk,
} from "../../../Reducer/loadProductSlice";
import { Buffer } from "buffer";
import commonUtils from "../../../utils/commonUtils";
import { useNavigate } from "react-router-dom";
import { idProduct, loadingProductDetail } from "../../../Reducer/buyerSlice";
import axios from "axios";

window.Buffer = Buffer;

const Products = () => {
  const [imageShow, setImageShow] = useState(null);
  const navigate = useNavigate();
  const productInf = useSelector((state) => state.loadProductSlice.product);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [IDproduct, setIDproduct] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(">>>currentUser:", currentUser);
    const fetchProduct = async () => {
      const statusId = "CONFIRMED";
      await loadingProduct(statusId, null, dispatch);
    };
    fetchProduct();
  }, []);

  // const handleClickProduct = async (e) => {
  //   console.log(">>>idProductDetail:", idProductDetail);
  //   console.log("IDproduct:", IDproduct);
  //   const data = dispatch(loadingProductDetail(IDproduct));
  // };

  const handleTestApi = async () => {
    // let id = "5";
    // let res = await axios.get("http://localhost:8080/productDetail", {
    //   params: { id },
    // });
    // console.log(">>>TEST API:", res);
    console.log(">>>product:", productInf);
  };

  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Grid container spacing={2}>
        {productInf &&
          productInf.length > 0 &&
          productInf.map((item) => {
            return (
              <Grid xs={3} key={item.id}>
                <Div
                  key={item.id}
                  onClick={async (e) => {
                    setIDproduct(item.id);
                    dispatch(idProduct(item.id));
                    // handleClickProduct();
                    await dispatch(loadingProductDetail(item.id));
                    navigate(`/productDetail/${item.id}`);
                  }}>
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

        <Grid xs={3}>
          <Div onClick={() => handleTestApi()}>test api</Div>
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
