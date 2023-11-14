import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Sort from "./Sort";
import Products from "./Products";
import Title from "./Title";
import Message from "../../../components/Message";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  maxHeight: "150vh",
  color: theme.palette.text.secondary,
  marginTop: "10px",
}));

const Content = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  return (
    <>
      <Title />
      <Box>
        <Grid container spacing={2}>
          <Grid xs={2.5}>
            <Item elevation={0}>
              <Sort />
            </Item>
          </Grid>
          <Grid xs={9.5}>
            <Item elevation={0} sx={{ borderLeft: "1px solid #cccccc" }}>
              <Products />
            </Item>
          </Grid>
        </Grid>
      </Box>
      {currentUser && <Message />}
    </>
  );
};

export default Content;
