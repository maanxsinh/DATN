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
  editPhoneNumber,
  editUserThunk,
  resetData,
} from "../../Reducer/userSlice";
import { editUser } from "../../Reducer/apiRequest";
import { emitter } from "../../utils/emitter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditUser() {
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
    await editUser(data, userId, dispatch);
    dispatch(resetData());
    console.log("---data:", data, "userId:", userId);
  };

  return (
    <React.Fragment>
      <AiFillEdit onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit Information"}</DialogTitle>
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
                  name="fullName"
                  onChange={(e) => dispatch(editFullName(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="phoneNumber">Phone Number</label>
                <InputChild
                  name="phoneNumber"
                  onChange={(e) => dispatch(editPhoneNumber(e.target.value))}
                />
              </Input>
            </Box>
            <Input>
              <label for="address">Address</label>
              <InputChild
                name="address"
                onChange={(e) => dispatch(editAddress(e.target.value))}
              />
            </Input>
          </Test>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleEdit} sx={{ color: "var(--pinky)" }}>
            Agree
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
