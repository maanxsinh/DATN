import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { BiSolidLock } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import { Box, Checkbox, Typography } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  editAddress,
  editEmail,
  editFullName,
  editGender,
  editPassword,
  editPhoneNumber,
  editTypeRole,
  editUserThunk,
  resetData,
} from "../../Reducer/userSlice";
import { createUser, editUser } from "../../Reducer/apiRequest";
import { emitter } from "../../utils/emitter";
import {
  openSbTrue,
  setSnackbarMessage,
  severitySuccess,
  severityWarning,
} from "../../Reducer/snackbarSlice";
import SnackbarComponent from "../Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUser() {
  const [open, setOpen] = React.useState(false);
  const [resetValue, setValue] = React.useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.editUserSlice.data);
  const userId = useSelector((state) => state.editUserSlice.userId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // dispatch(resetData());
  };

  const handleEdit = async () => {
    if (
      !data.email ||
      !data.fullName ||
      !data.password ||
      !data.gender ||
      !data.phoneNumber ||
      !data.address ||
      !data.typeRole
    ) {
      dispatch(openSbTrue());
      dispatch(severityWarning());
      dispatch(setSnackbarMessage("Please fill in all fields"));
    } else {
      setOpen(false);
      createUser(data, dispatch);
      console.log("---data:", data);
      setValue(null);
      dispatch(resetData());
      dispatch(openSbTrue());
      dispatch(severitySuccess());
      dispatch(setSnackbarMessage("Create user successfull"));
    }
  };

  return (
    <React.Fragment>
      <SnackbarComponent />
      <ButtonCreate onClick={handleClickOpen}>Create User</ButtonCreate>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Create User"}</DialogTitle>
        <DialogContent>
          <Test>
            <Box sx={{ display: "flex", margin: "10px 0" }}>
              <BiSolidLock style={{ color: "#6e6e6e" }} />
              <Typo11>&nbsp;&nbsp;Your information is secure.</Typo11>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "69%" }}>
                <label for="email">Email</label>
                <InputChild
                  value={resetValue}
                  name="email"
                  onChange={(e) => dispatch(editEmail(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "29%" }}>
                <label for="gender">Gender</label>
                <Select onChange={(e) => dispatch(editGender(e.target.value))}>
                  <option value={null}></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </Input>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="fullName">Full Name</label>
                <InputChild
                  value={resetValue}
                  name="fullName"
                  onChange={(e) => dispatch(editFullName(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="password">Password</label>
                <InputChild
                  value={resetValue}
                  name="password"
                  type="password"
                  onChange={(e) => dispatch(editPassword(e.target.value))}
                />
              </Input>
            </Box>
            <Input>
              <label for="address">Address</label>
              <InputChild
                value={resetValue}
                name="address"
                onChange={(e) => dispatch(editAddress(e.target.value))}
              />
            </Input>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="phoneNumber">Phone Number</label>
                <InputChild
                  value={resetValue}
                  name="phoneNumber"
                  onChange={(e) => dispatch(editPhoneNumber(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="typeRole">Role</label>
                <Select
                  onChange={(e) => dispatch(editTypeRole(e.target.value))}
                  sx={{ width: "230px" }}>
                  <option value="R2">Buyer/Seller</option>
                  <option value="R1">Admin</option>
                </Select>
              </Input>
            </Box>
          </Test>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit} sx={{ color: "var(--pinky)" }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Test = styled("div")(({ theme }) => ({}));

const Typo11 = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "#6e6e6e",
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
}));

const PaymentMet = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Typo12 = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "black",
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

const Select = styled("select")(({ theme }) => ({
  fontSize: "17px",
  border: "none",
  outline: "none",
  padding: "1px 2px ",
  backgroundColor: "white",
  width: "123px",
  height: "36px",
  marginLeft: "-7px",
  // margin: "0px",
  // padding: "12px 0 0 15px",
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

const Typo15 = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  margin: "15px 15px 15px 0",
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
