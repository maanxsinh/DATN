import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--lightPink)",
        height: "510px",
        margin: "100px 0 0 0",
      }}>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} sx={{ width: "80vw" }}>
          <Grid xs={2}>
            <Typo14>ABOUT</Typo14>
            <Typo12>About Us</Typo12>
            <Typo12>Newsletter</Typo12>
            <Typo12>Careers</Typo12>
            <Typo12>Refer a Friend</Typo12>
            <Typo12>Student Discount</Typo12>
            <Typo12>Wholesale Program</Typo12>
            <Typo12>Trade Program</Typo12>
          </Grid>
          <Grid xs={2}>
            <Typo14>HELP</Typo14>
            <Typo12>Track My Order</Typo12>
            <Typo12>Return My Order</Typo12>
            <Typo12>FAQs</Typo12>
            <Typo12>Contact Us</Typo12>
          </Grid>
          <Grid xs={2}>
            <Typo14>SHOP</Typo14>
            <Typo12>iPhone 15 promax</Typo12>
            <Typo12>iPhone 14</Typo12>
            <Typo12>iPhone 13 promax</Typo12>
            <Typo12>iPhone 12 pro</Typo12>
          </Grid>
          <Grid xs={2}>
            <Typo14>CUSTOMER SERVICE</Typo14>
            <Typo12>Shop Blog</Typo12>
            <Typo12>How To Buy</Typo12>
            <Typo12>How To Sell</Typo12>
            <Typo12>Payment</Typo12>
            <Typo12>Shipping</Typo12>
          </Grid>
          <Grid xs={4}>
            <Typo12 sx={{ margin: "30px 0 15px 0" }}>
              Sign up to receive exclusive offers, decor tips and features about
              Society6 artists.
            </Typo12>
            <Box sx={{ display: "flex" }}>
              <Input></Input>
              <Button>Sign Up</Button>
            </Box>
            <Box>
              <Typo14>FOLLOW US</Typo14>
              <Typo12>icon</Typo12>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "100px 0 0 0",
        }}>
        <Typo12 sx={{ width: "80vw" }}>
          © 2020 Society6, LLC. LG Commerce. Some rights reserved. | Privacy
          Notice | Cookie Notice | Manage Preferences | California Notice of
          Collection | Terms of Service | Copyright & Trademark
        </Typo12>
      </Box>
    </Box>
  );
};

export default Footer;

const Item = styled(Box)(({ theme }) => ({
  border: "1px solid red",
  color: theme.palette.text.secondary,
}));

const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));

const Typo14 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.secondary,
  margin: "30px 0 15px 0",
}));

const Input = styled("input")(({ theme }) => ({
  fontSize: "14px",
  backgroundColor: "white",
  height: "44px",
  width: "293px",
  margin: "0px",
}));

const Button = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "white",
  backgroundColor: "black",
  height: "44px",
  width: "87px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
