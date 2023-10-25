import Box from "@mui/material/Box";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
// import Grid from "@mui/material/Unstable_Grid2";

const ProductDetail = () => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          height: "3000px",
        }}>
        {/* <Grid
          container
          spacing={0}
          sx={{ display: "flex", justifyContent: "center" }}>
          <Grid xs={5}>
          </Grid>
          <Grid xs={5}>
          </Grid>
        </Grid> */}
        <Item>
          <div>
            <img
              src="https://ctl.s6img.com/society6/img/6Y76ks-fAXJxQ5D6XRvfl211h9Y/w_700/cases/iphone15/slim/back/~artwork,fw_1300,fh_2000,fx_-100,iw_1499,ih_2000/s6-original-art-uploads/society6/uploads/misc/4130672dfeda4367bdb76e6cadc940ca/~~/exotic-garden-night-xxi-cases.jpg?attempt=0"
              style={{ height: "586px", width: "586px" }}
            />
          </div>
        </Item>
        <Item>
          <div style={{ marginLeft: "42px" }}>
            <Typography variant="h6" gutterBottom>
              EXOTIC GARDEN - NIGHT XXI iPhone Case
            </Typography>
            <Typo16 gutterBottom>by Burcu Korkmazyurek</Typo16>
            <Span13>★★★★★</Span13>
            <Span13 sx={{ marginLeft: "10px" }}>1 review</Span13>
            <Typo16 sx={{ marginTop: "75px", fontWeight: "500" }} gutterBottom>
              $22.00
            </Typo16>
            <Typo16 sx={{ marginTop: "40px" }} gutterBottom>
              MODEL
            </Typo16>
            <Select>
              <option value="iPhone 15 promax">iPhone 15</option>
              <option value="iPhone 15 promax">iPhone 15</option>
            </Select>
            <Typo16 sx={{ marginTop: "40px" }} gutterBottom>
              QUANTITY
            </Typo16>
            <DivQuantity>
              <Button>—</Button>
              <Label>1</Label>
              <input type="text" style={{ display: "none" }} />
              <Button sx={{ fontSize: "16px" }}>+</Button>
            </DivQuantity>
            <BtAddToCart>Add To Cart</BtAddToCart>
          </div>
        </Item>
      </Box>
    </>
  );
};

export default ProductDetail;

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: "center",
  // color: theme.palette.text.secondary,
  width: "586px",
  height: "2000px",
  border: "1px solid black",
}));
const Span13 = styled("span")(({ theme }) => ({
  fontSize: "13px",
}));
const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: "0px",
}));
const Typo14 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));

const Select = styled("select")(({ theme }) => ({
  height: "50px",
  width: "520px",
  fontSize: "16px",
  padding: "10px",
  marginTop: "10px",
}));
const Option = styled("option")(({ theme }) => ({
  padding: "16px",
  margin: "16px",
}));

const Button = styled("button")(({ theme }) => ({
  border: "none",
  textAlign: "center",
  backgroundColor: "white",
  color: "black",
  height: "40px",
  width: "40px",
  padding: "0",
  cursor: "pointer",
}));

const Label = styled("label")(({ theme }) => ({
  textAlign: "center",
  padding: "0px 50px",
  fontSize: "16px",
}));

const DivQuantity = styled("div")(({ theme }) => ({
  marginTop: "16px",
  border: "1px solid #999999",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "42px",
  width: "195px",
}));

const BtAddToCart = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "16px",
  border: "1px solid black",
  borderRadius: "5px",
  height: "53px",
  width: "520px",
  color: "white",
  backgroundColor: "black",
  fontSize: "20px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
}));
