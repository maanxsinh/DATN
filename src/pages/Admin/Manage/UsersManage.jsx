import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import { emitter } from "../../utils/emitter";
import SnackbarComponent from "../Snackbar";
// import { openSbTrue, setSnackbarMessage } from "../../Reducer/snackbarSlice";
import CircularProgress from "@mui/material/CircularProgress";
import EditUser from "../../../components/EditUser";
import { getUserIdEdit } from "../../../Reducer/userSlice";
import { emitter } from "../../../utils/emitter";
import CreateUser from "../../../components/EditUser/CreateUser";
import {
  openSbTrue,
  setSnackbarMessage,
  severitySuccess,
} from "../../../Reducer/snackbarSlice";
import { deleteUser } from "../../../Reducer/apiRequest";

const UsersManage = () => {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const users = useSelector((state) => state.manageSlice.data);
  const isLoading = useSelector((state) => state.manageSlice.isLoading);
  const userId = useSelector((state) => state.editUserSlice.userId);
  const snackbarMessage = useSelector(
    (state) => state.snackbarSlice.snackbarMessage
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setAction(null);
  };

  const handleDeleteUser = (e) => {
    setOpen(true);
    setAction("delete");
  };

  const handleChangeAll = (e) => {};

  const handleChooseUser = (e) => {};

  const handleAction = () => {
    setOpen(false);
    deleteUser(userId, dispatch);
    // console.log("---userId:", userId);
    dispatch(openSbTrue());
    dispatch(severitySuccess());
    dispatch(setSnackbarMessage("Delete user successfull"));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80vw", margin: "50px 0 80px 0" }}>
          <CreateUser />
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#e5e5e5",
              // height: "50px",
            }}>
            <Grid container spacing={2}>
              <Grid xs={0.5}>
                <Head>
                  {/* <Checkbox
                    {...label}
                    color="default"
                    value={selected.length}
                    checked={selected.length}
                    onChange={(e) => handleChangeAll(e)}
                  /> */}
                </Head>
              </Grid>
              <Grid xs={2}>
                <Head>Name</Head>
              </Grid>
              <Grid xs={2.5}>
                <Head>Email</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Phone Number</Head>
              </Grid>
              <Grid xs={1}>
                <Head>Gender</Head>
              </Grid>
              <Grid xs={3}>
                <Head>Address</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Actions</Head>
              </Grid>
            </Grid>
          </Box>
          {!isLoading && users && users.length > 0 ? (
            users.map((item, index) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    flexGrow: 1,
                    borderBottom: "1px solid #cccccc",
                    padding: "20px 0",
                  }}>
                  <Grid container spacing={2}>
                    <Grid xs={0.5}>
                      <Item>
                        {/* <Checkbox
                          {...label}
                          color="default"
                          value={item.id}
                          checked={selected.includes(item.id)}
                          onChange={(e) => {
                            handleChooseUser(e);
                            console.log(
                              ">>>is Checked???:",
                              e.target.checked,
                              typeof item.id
                            );
                            // setIsCheck(e.target.checked);
                          }}
                        /> */}
                      </Item>
                    </Grid>
                    <Grid xs={2}>
                      <Item>
                        {/* <img
                          alt="hinhanh"
                          src={item.imageToBase64}
                          style={{ height: "56px", witdh: "56px" }}
                        /> */}
                        {item.fullName}
                      </Item>
                    </Grid>
                    <Grid xs={2.5}>
                      <Item>{item.email}</Item>
                    </Grid>
                    <Grid xs={1.5}>
                      <Item>{item.phoneNumber}</Item>
                    </Grid>
                    <Grid xs={1}>
                      <Item>{item.gender}</Item>
                    </Grid>
                    <Grid xs={3}>
                      <Item sx={{ overflow: "auto" }}>{item.address}</Item>
                    </Grid>
                    <Grid xs={1.5}>
                      <Item sx={{}}>
                        <Action
                          onClick={() => {
                            handleDeleteUser();
                            dispatch(getUserIdEdit(item.id));
                          }}>
                          <BsFillTrash3Fill />
                        </Action>
                        <Action
                          onClick={() => dispatch(getUserIdEdit(item.id))}>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <EditUser />
                        </Action>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "60px",
              }}>
              <CircularProgress />
            </Box>
          )}
          {selected.length > 0 && (
            <Actions>
              <ButtonAction
                sx={{ backgroundColor: "var(--pinky)" }}
                onClick={() => {
                  setOpen(true);
                  setAction("confirm");
                }}>
                <AiFillSafetyCertificate />
                &nbsp;&nbsp;CONFIRM
              </ButtonAction>
              <ButtonAction
                sx={{ backgroundColor: "black" }}
                onClick={() => {
                  setOpen(true);
                  setAction("delete");
                }}>
                <BsFillTrash3Fill />
                &nbsp;&nbsp;DELETE
              </ButtonAction>
            </Actions>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {action === "confirm"
                ? "Do you want to confirmed?"
                : "Do you want to delete?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleAction()} autoFocus>
                {action === "confirm" ? "Confirm" : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
          {/* <button onClick={() => handleTest()}>TEST</button> */}
          <SnackbarComponent />
        </Box>
      </Box>
    </>
  );
};

export default UsersManage;

const Item = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  height: "50px",
  display: "flex",
  alignItems: "flex-start",
}));

const Head = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  height: "50px",
  display: "flex",
  alignItems: "center",
}));

const Sort = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  padding: "10px",
  margin: "20px 0",
  borderBottom: "1px solid #cccccc",
  cursor: "pointer",
}));
const Typo20 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  padding: "10px",
  margin: "20px 0",
  // borderLeft: "1px solid #cccccc",
  // textDecoration: "underline",
}));

const Action = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  padding: "5px 0",
  cursor: "pointer",
  // "&:hover": {
  //   color: "var(--pinky)",
  // },
}));

const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100px",
  width: "360px",
  position: "fixed",
  zIndex: 1,
  borderRadius: "10px",
  bottom: 0,
  right: 145,
}));

const ButtonAction = styled("button")(({ theme }) => ({
  height: "45px",
  border: "none",
  "&:hover": {
    opacity: "0.8",
  },
}));

const ButtonCreate = styled("button")(({ theme }) => ({
  height: "45px",
  border: "none",
  backgroundColor: "var(--pinky)",
  margin: "0 0 30px 0",
  "&:hover": {
    opacity: "0.8",
  },
}));
