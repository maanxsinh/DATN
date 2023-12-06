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
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setEmail,
  setFullName,
  setPhoneNumber,
} from "../../Reducer/buyerSlice";
import {
  createDeliveryAddress,
  getDeliveryAddress,
  updateDeliveryAddress,
} from "../../Reducer/apiRequest";
import { setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeliveryAdress() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.deliveryAddressSlice.data);
  const user = useSelector((state) => state.auth.login.currentUser);
  const deliveryInf = useSelector(
    (state) => state.deliveryAddressSlice.deliveryAddress
  );

  const resetValue = () => {
    dispatch(setEmail(""));
    dispatch(setFullName(""));
    dispatch(setPhoneNumber(""));
    dispatch(setAddress(""));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeDeliveryAddress = async () => {
    await getDeliveryAddress(user.data.id);
    if (deliveryInf === null) {
      if (
        data.email === undefined ||
        data.fullName === undefined ||
        data.phoneNumber === undefined ||
        data.address === undefined
      ) {
        setSnackbar("warning", "Please fill in all fields", dispatch);
      } else {
        await createDeliveryAddress(user.data.id, data);
        setSnackbar(
          "success",
          "Create Shipping information successfull!",
          dispatch
        );
      }
    } else {
      if (
        data.email === undefined &&
        data.fullName === undefined &&
        data.phoneNumber === undefined &&
        data.address === undefined
      ) {
        setSnackbar("warning", "Nothing change!", dispatch);
        console.log("---delivery address change:", data);
      } else {
        await updateDeliveryAddress(user.data.id, data);
        await getDeliveryAddress(user.data.id, dispatch);
        setSnackbar("success", "Update delivery address successfull", dispatch);
        setOpen(false);

        console.log("---delivery address change:", data);
      }
    }
  };

  return (
    <React.Fragment>
      <Typo15
        onClick={handleClickOpen}
        sx={{
          color: "#4080ee",
          textDecoration: "underline",
          cursor: "pointer",
        }}>
        Change
      </Typo15>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Shipping information"}</DialogTitle>
        <DialogContent>
          <Test>
            <Box sx={{ display: "flex", margin: "10px 0" }}>
              <BiSolidLock style={{ color: "#6e6e6e" }} />
              <Typo11>&nbsp;&nbsp;Your information is secure.</Typo11>
            </Box>

            <Input>
              <label for="email">Email</label>
              <InputChild
                name="email"
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
            </Input>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="fullName">Full Name</label>
                <InputChild
                  name="fullName"
                  onChange={(e) => dispatch(setFullName(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="phoneNumber">Phone Number</label>
                <InputChild
                  name="phoneNumber"
                  onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                />
              </Input>
            </Box>
            <Input>
              <label for="address">Address</label>
              <InputChild
                name="address"
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
            </Input>
          </Test>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => handleChangeDeliveryAddress()}
            sx={{ color: "var(--pinky)" }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent />
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
