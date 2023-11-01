import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { BiSolidLock } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";

const Checkout = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}>
      <Grid container spacing={2} sx={{ width: "80vw" }}>
        <Grid xs={12}>
          <Header>
            <img
              src="https://cdn.dribbble.com/users/844704/screenshots/17336702/media/5ba4c28448fb1f7bad2391c9acb53506.png"
              style={{ height: "69px", width: "93px" }}
            />
          </Header>
        </Grid>
        <Grid xs={7.2}>
          <Test>
            <Box sx={{ display: "flex" }}>
              <BiSolidLock style={{ color: "#6e6e6e" }} />
              <Typo11>&nbsp;&nbsp;Your information is secure.</Typo11>
            </Box>
            <Typography sx={{ fontSize: "25px" }}>Checkout</Typography>
            <Typo16>Payment method</Typo16>
            <PaymentMet>
              <Checkbox
                // {...label}
                defaultChecked
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "#db214c",
                  },
                }}
              />
              <Typo12>Cash on Delivery</Typo12>
            </PaymentMet>
            <PaymentMet>
              <Checkbox
                // {...label}
                defaultChecked
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "#db214c",
                  },
                }}
              />
              <Typo12>Credit Card/ Debit Card</Typo12>
            </PaymentMet>
            <Typo16>Shipping information</Typo16>
            <Input>
              <label for="email">Email</label>
              <InputChild name="email" />
            </Input>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="fullName">Full Name</label>
                <InputChild name="fullName" />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="phoneNumber">Phone Number</label>
                <InputChild name="phoneNumber" />
              </Input>
            </Box>
            <Input>
              <label for="address">Address</label>
              <InputChild name="address" />
            </Input>
          </Test>
        </Grid>
        <Grid xs={4.8}>
          <Test sx={{ border: "24.8px solid #d1d1d1", padding: "20px" }}>
            <Typography sx={{ fontSize: "20px" }}>Item in your cart</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="https://ctl.s6img.com/society6/img/B7wKGq9Bj0DS3ySy9hM2Mx40Bo0/h_200,w_200/cases/iphone15/slim/back/~artwork,fw_1300,fh_2000,fx_-100,iw_1499,ih_2000/s6-original-art-uploads/society6/uploads/misc/4130672dfeda4367bdb76e6cadc940ca/~~/exotic-garden-night-xxi-cases.jpg"
                style={{ height: "118px", width: "118px" }}
              />
              <Box>
                <Typo16 sx={{ fontWeight: "500" }}>$65.00</Typo16>
                <Typo16>iPhone</Typo16>
                <Typo16>iPhone 15 promax 256Gb</Typo16>
                <DivQuantity>
                  <Button>—</Button>
                  <Label>1</Label>
                  <input type="text" style={{ display: "none" }} />
                  <Button sx={{ fontSize: "16px" }}>+</Button>
                </DivQuantity>
              </Box>
              <MdCancel style={{ fontSize: "120%", cursor: "pointer" }} />
            </Box>
            <Typography
              sx={{
                fontSize: "18px",
                padding: "16px 0",
                fontWeight: "500",
                borderTop: "1px solid #cccccc",
                margin: "20px 0 0 0",
              }}>
              Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "51px",
                borderTop: "1px solid #cccccc",
                alignItems: "center",
              }}>
              <Typo15>Your cart items</Typo15>
              <Typo15>$95.00</Typo15>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "51px",
                borderTop: "1px solid #cccccc",
                alignItems: "center",
              }}>
              <Typo15>Shipping: Standard</Typo15>
              <Typo15>$9.69</Typo15>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "51px",
                borderTop: "1px solid #cccccc",
                alignItems: "center",
              }}>
              <Typo15 sx={{ fontWeight: "600" }}>Estimated Total</Typo15>
              <Typo15 sx={{ fontWeight: "600" }}>$104.69</Typo15>
            </Box>
          </Test>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;

const Header = styled("div")(({ theme }) => ({
  height: "100px",
  borderBottom: "1px solid #cccccc",
}));
const Test = styled("div")(({ theme }) => ({}));

const Typo11 = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "#6e6e6e",
}));

const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "black",
}));

const Typo15 = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  color: "black",
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
}));

const PaymentMet = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Input = styled("div")(({ theme }) => ({
  fontSize: "12px",
  height: "67px",
  border: "1px solid #b9b9b9",
  color: "#6e6e6e",
  padding: "6px 10px 0",
  borderRadius: "2px",
  margin: "0 0 10px 0",
}));
const InputChild = styled("input")(({ theme }) => ({
  fontSize: "17px",
  border: "none",
  outline: "none",
  padding: "1px 2px ",
  backgroundColor: "white",
  // margin: "0px",
  // padding: "12px 0 0 15px",
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
