import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Header from "../../components/Header";
import commonUtils from "../../utils/commonUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  IdAuthorInput,
  datePostInput,
  descriptionInput,
  imageInput,
  nameInput,
  priceInput,
  sortInput,
  statusInput,
  warehouseInput,
  weightInput,
} from "../../Reducer/sellerSlice";
import { uploadProduct } from "../../Reducer/apiRequest";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [productImg, setProductImg] = useState({ imgURL: null, image: null });
  const [warn, setWarn] = useState(false);
  const product = useSelector((state) => state.uploadProduct.product);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await commonUtils.getBase64(file);
      dispatch(imageInput(base64));
      let objectUrl = URL.createObjectURL(file);
      setProductImg({
        imgURL: objectUrl,
        image: file,
      });
      console.log(">>> IMAGE", base64);
      console.log(">>> IMAGE", objectUrl);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    let today = new Date();
    // console.log(">>> user:", user);
    dispatch(datePostInput(today));
    dispatch(IdAuthorInput(user.data.id));
    // let today = new Date().toISOString().slice(0, 10);
  }, []);

  const handleOnClick = async () => {
    try {
      if (
        !product.name ||
        !product.sort ||
        !product.description ||
        !product.image ||
        !product.price ||
        !product.warehouse ||
        !product.status ||
        !product.IdAuthor ||
        !product.datePost
      ) {
        setWarn(true);
        console.log(">>> thieu thong tin", product);
      } else {
        console.log(">>> UPLOAD SUCCESSFULL", product);
        await uploadProduct(product, dispatch);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={2}>
          <Grid xs={2.5}>
            <Item>
              <div
                style={{
                  fontSize: "20px",
                  borderBottom: "1px solid #cccccc",
                  padding: "10px 0px",
                }}>
                Product information
              </div>
              <div
                style={{
                  fontSize: "20px",
                  borderBottom: "1px solid #cccccc",
                  padding: "10px 0px",
                }}>
                Selling information
              </div>
              <div style={{ fontSize: "20px", padding: "10px 0px" }}>
                Others
              </div>
            </Item>
          </Grid>
          <Grid xs={8.5}>
            <Item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typography variant="h5" gutterBottom sx={{ maxWidth: "250px" }}>
                Product information
              </Typography>
              <Typo variant="h6" gutterBottom>
                <Div>Image</Div>
                <div>
                  <Label for="file">Upload file</Label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => handleOnchangeFile(e)}
                  />
                </div>
                {warn && !product.image && (
                  <Warn sx={{ marginLeft: "20px !important" }}>
                    *Please fill out this field
                  </Warn>
                )}
                {productImg.imgURL !== null && (
                  <div
                    style={{
                      marginLeft: "20px",
                      borderRadius: "6px",
                      height: "93.78px",
                      width: "93.78px",
                    }}>
                    <img
                      src={productImg.imgURL === null ? "" : productImg.imgURL}
                      alt="img"
                      style={{
                        height: "93.78px",
                        width: "93.78px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                )}
              </Typo>
              <Typo variant="h6" gutterBottom>
                <Div>Name</Div>
                <Input
                  type="text"
                  onChange={(e) => {
                    dispatch(nameInput(e.target.value));
                  }}
                />
                {warn && !product.name && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
              <Typo variant="h6" gutterBottom>
                <Div>Sort</Div>
                <Select
                  defaultValue={null}
                  onChange={(e) => {
                    dispatch(sortInput(e.target.value));
                  }}>
                  <option value={null}></option>
                  <option value="iPhone">iPhone</option>
                  <option value="iPad">iPad</option>
                  <option value=">iPhone Cases">iPhone Cases</option>
                </Select>
                {warn && !product.sort && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
              <Typo variant="h6" gutterBottom>
                <Div>Description</Div>
                <Input
                  type="text"
                  style={{ minHeight: "150px" }}
                  onChange={(e) => {
                    dispatch(descriptionInput(e.target.value));
                  }}
                />
                {warn && !product.description && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
            </Item>
            <Item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typography variant="h5" gutterBottom sx={{ maxWidth: "250px" }}>
                Selling Information
              </Typography>

              <Typo variant="h6" gutterBottom>
                <Div>Price</Div>
                <Input
                  type="text"
                  onChange={(e) => {
                    dispatch(priceInput(e.target.value));
                  }}
                />
                {warn && !product.price && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
              <Typo variant="h6" gutterBottom>
                <Div>Warehouse</Div>
                <Input
                  type="text"
                  onChange={(e) => {
                    dispatch(warehouseInput(e.target.value));
                  }}
                />
                {warn && !product.warehouse && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
            </Item>
            <Item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typography variant="h5" gutterBottom sx={{ maxWidth: "250px" }}>
                Others
              </Typography>

              <Typo variant="h6" gutterBottom>
                <Div>Weight</Div>
                <Input
                  type="text"
                  onChange={(e) => {
                    dispatch(weightInput(e.target.value));
                  }}
                />
              </Typo>
              <Typo variant="h6" gutterBottom>
                <Div>Status</Div>
                <Select
                  defaultValue={null}
                  onChange={(e) => {
                    dispatch(statusInput(e.target.value));
                  }}>
                  <option value={null}></option>
                  <option value="New">New</option>
                  <option value="90%">90-99%</option>
                  <option value="80%">80-89%</option>
                  <option value="70%">70-79%</option>
                </Select>
                {warn && !product.status && (
                  <Warn>*Please fill out this field</Warn>
                )}
              </Typo>
            </Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="outlined" sx={{ margin: "30px 20px 50px 0" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ margin: "30px 0 50px 10px" }}
                onClick={() => handleOnClick()}>
                Send
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Upload;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  maxHeight: "150vh",
  color: theme.palette.text.secondary,
  marginTop: "10px",
}));
const Div = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: "16px",
  width: "150px !important",
  justifyContent: "center",
  alignItems: "center",
}));
const Label = styled("label")(({ theme }) => ({
  display: "inline-block",
  border: "1px dashed #999",
  padding: "30px",
  borderRadius: "6px",
  "&:hover": {
    border: "1px dashed #de0611",
    color: "#de0611",
  },
}));
const Typo = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));
const Input = styled("input")(({ theme }) => ({
  width: "950px !important",
  borderRadius: "6px",
  fontSize: "16px",
}));
const Select = styled("select")(({ theme }) => ({
  height: "39.11px",
  borderRadius: "6px",
  fontSize: "16px",
  textAlign: "center",
  border: "1px solid #999",
  marginRight: "800px",
}));
const Warn = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: "red",
  margin: "0px 0px 30px 152px",
}));
