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
import { IoIosCreate } from "react-icons/io";
import {
  createPostThunk,
  setAuthorId,
  setContentPost,
  setTimePost,
} from "../../Reducer/buyerSlice";
import { setSnackbar } from "../../utils/commonUtils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const post = useSelector((state) => state.createPostSlice.post);

  React.useEffect(() => {
    let timePost = new Date();
    dispatch(setTimePost(timePost));
    dispatch(setAuthorId(currentUser?.data?.id));
  }, []);

  const resetInput = () => {};
  const handleClickOpen = () => {
    setOpen(true);
    resetInput();
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetData());
  };

  const handlePost = async () => {
    if (!post.content || post.content === "") {
    } else {
      dispatch(createPostThunk(post));
      dispatch(setContentPost(""));
      setSnackbar("success", "Create Post Successfull", dispatch);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <SnackbarComponent />
      <Item onClick={handleClickOpen}>
        <IoIosCreate style={{ fontSize: "210%", marginRight: "10px" }} />
        Post
      </Item>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Create Post"}</DialogTitle>
        <DialogContent>
          <Test>
            <img
              alt="avatar"
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
              style={{ width: "48px", height: "48px" }}
            />
            <Typo16 sx={{ fontWeight: 500 }}>
              {currentUser?.data?.fullName}
            </Typo16>
          </Test>
          <Input
            placeholder="Write something..."
            onChange={(e) => dispatch(setContentPost(e.target.value))}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <ButtonCreate onClick={handlePost} sx={{ color: "white" }}>
            Post
          </ButtonCreate>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Test = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "500px",
  borderTop: "1px solid #cccccc",
  padding: "5px 0",
}));

const Typo11 = styled(Typography)(({ theme }) => ({
  fontSize: "11px",
  color: "#6e6e6e",
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
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

const Input = styled("input")(({ theme }) => ({
  fontSize: "20px",
  height: "67px",
  backgroundColor: "white",
  outline: "none",
  //   border: "none",
}));

const Typo15 = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  margin: "15px 15px 15px 0",
}));

const ButtonCreate = styled("button")(({ theme }) => ({
  height: "45px",
  border: "none",
  width: "500px",
  backgroundColor: "var(--pinky)",
  margin: "0 0 10px 0",
  //   margin: "0 0 30px 0",
  "&:hover": {
    opacity: "0.8",
  },
}));

const Item = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  color: "black",
  margin: "0 10px",
  padding: "10px",
  height: "48px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
}));
