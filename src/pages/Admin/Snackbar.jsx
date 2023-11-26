import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  getProducts,
  getUsers,
  managementAction,
} from "../../Reducer/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function Snackbar() {
  const dispatch = useDispatch();
  const manage = useSelector((state) => state.manageSlice.manage);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetUsers = async () => {
    dispatch(getUsers());
    dispatch(managementAction("users"));
  };

  const handleGetProducts = () => {
    dispatch(getProducts());
    dispatch(managementAction("products"));
  };

  const handleGetOrders = () => {
    dispatch(getOrders());
    dispatch(managementAction("orders"));
  };

  return (
    <React.Fragment>
      <MenuIcon onClick={handleClickOpen} />
      <Dialog
        sx={{ display: "flex", margin: "-530px 0px 0px -32px" }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Management"}</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleGetUsers()}>
              Users
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton autoFocus onClick={() => handleGetProducts()}>
              Products
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton autoFocus onClick={() => handleGetOrders()}>
              Order
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
