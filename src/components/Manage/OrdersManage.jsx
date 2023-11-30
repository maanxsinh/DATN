import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  loadingProduct,
  confirmProduct,
} from "../../Reducer/apiRequest";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { emitter } from "../../utils/emitter";
import SnackbarComponent from "../Snackbar";
import { openSbTrue, setSnackbarMessage } from "../../Reducer/snackbarSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toVnd } from "../../utils/commonUtils";
import { managementAction } from "../../Reducer/userSlice";
import { MdDone } from "react-icons/md";

const OrdersManage = () => {
  const [sort, setSort] = useState("new");
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(null);
  const navigate = useNavigate();
  const product = useSelector((state) => state.loadProductSlice.product);
  const orders = useSelector((state) => state.manageSlice.data);
  const user = useSelector((state) => state.auth.login.currentUser);
  const isLoading = useSelector((state) => state.loadProductSlice.isLoading);
  const snackbarMessage = useSelector(
    (state) => state.snackbarSlice.snackbarMessage
  );

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setAction(null);
  };

  useEffect(() => {
    // if (!currentUser) {
    //   navigate("/login");
    // }
    // const fetchProduct = async () => {
    //   const statusId = null;
    //   console.log(">>> current USER:", user.data);
    //   if (user.data.typeRole === "R1") {
    //     await loadingProduct(null, null, dispatch);
    //     console.log(">>> R1");
    //   } else {
    //     const IdAuthor = user.data.id;
    //     console.log(">>> R2");
    //     await loadingProduct(null, IdAuthor, dispatch);
    //   }
    // };
    // fetchProduct();
    // console.log(">>> product:", product);
  }, []);

  const handleLoadOrders = (sort, manage, role, statusName) => {
    setSort(sort);
    setSelected([]);
    if (user.data.typeRole === "R1") {
      const userId = null;
      dispatch(managementAction({ manage, role, userId, statusName }));
      console.log(">>> R1");
    } else {
      const userId = user.data.id;
      console.log(">>> R2");
      dispatch(managementAction({ manage, role, userId, statusName }));
    }
  };

  const handleLoadConfirmProduct = async () => {
    handleLoadOrders("confirm", "orders", "admin", "CONFIRMED");
  };
  const handleLoadNewProduct = async () => {
    handleLoadOrders("new", "orders", "admin", "NEW");
  };
  const handleLoadDoneProduct = async () => {
    handleLoadOrders("complete", "orders", "admin", "COMPLETED");
  };

  const handleChangeAll = (e) => {
    console.log(">>> value:", e.target.value, ">>>array:", selected);
    if (e.target.value === "0") {
      // if true
      const arrayIDitem = orders.map((item) => item.productId);
      setSelected(arrayIDitem); // select all
    } else {
      // if false
      setSelected([]); // unselect all
    }
    console.log(">>> value:", e.target.value, ">>>array:", typeof selected[0]);
  };

  const handleChooseProduct = (e) => {
    let value = parseInt(e.target.value, 10);
    const isExist = selected.includes(value);
    console.log(">>>isExist:", isExist);
    console.log(">>>isExist2:", typeof value);
    if (!isExist) {
      // if true
      setSelected([...selected, value]); // add to selected
      console.log(">>>TRUE:", selected);
    } else {
      // if false
      setSelected(selected.filter((item) => item !== value)); // remove from selected
      console.log(">>>FALSE:", selected);
    }
  };
  const handleAction = async () => {
    setSelected([]);
    handleClose();
    dispatch(setSnackbarMessage("success"));
    dispatch(openSbTrue());
    if (action === "confirm") {
      if (user.data.typeRole === "R1") {
        let IdAuthor = null;
        await confirmProduct(selected, null, IdAuthor, dispatch);
      } else {
        let IdAuthor = user.data.id;
        await confirmProduct(selected, null, IdAuthor, dispatch);
      }
      emitter.on("EVENT_CONFIRM_DATA");
      console.log(">>>confirm");
      setAction(null);
    } else if (action === "delete") {
      if (user.data.typeRole === "R1") {
        let IdAuthor = null;
        await deleteProduct(selected, null, IdAuthor, dispatch);
      } else {
        let IdAuthor = user.data.id;
        await deleteProduct(selected, null, IdAuthor, dispatch);
      }
      emitter.on("EVENT_DELETE_DATA", () => {});
      console.log(">>>delete");
      setAction(null);
    }
  };

  const handleTest = () => {
    console.log(">>> array Product:", selected);
    console.log(">>>action:", action, ">>>typeof action", typeof action);
    // console.log(">>> check product:", product);
    // console.log(">>>name:", name, ">>>typeof name:", typeof name);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      {user.data.typeRole !== "R1" && <Header />}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80vw", margin: "0 0 80px 0" }}>
          <Sort>
            <Typo16
              onClick={() => handleLoadNewProduct()}
              sx={sort === "new" && { borderBottom: "4px solid black" }}>
              New
            </Typo16>
            <Typo16
              onClick={() => handleLoadConfirmProduct()}
              sx={sort === "confirm" && { borderBottom: "4px solid black" }}>
              Confirmed
            </Typo16>
            <Typo16
              onClick={() => handleLoadDoneProduct()}
              sx={sort === "complete" && { borderBottom: "4px solid black" }}>
              Completed
            </Typo16>
            <Typo20>
              Selected:&nbsp;{selected.length}/{orders?.length}
            </Typo20>
          </Sort>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#e5e5e5",
              // height: "50px",
            }}>
            <Grid container spacing={2}>
              <Grid xs={0.5}>
                <Head>
                  <Checkbox
                    {...label}
                    color="default"
                    value={selected.length}
                    checked={selected.length}
                    onChange={(e) => handleChangeAll(e)}
                  />
                </Head>
              </Grid>
              <Grid xs={3}>
                <Head>Product</Head>
              </Grid>
              <Grid xs={2}>
                <Head>Seller</Head>
              </Grid>
              <Grid xs={2}>
                <Head>Buyer</Head>
              </Grid>
              <Grid xs={2}>
                <Head>Order's date</Head>
              </Grid>
              <Grid xs={1}>
                <Head>Status</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Actions</Head>
              </Grid>
            </Grid>
          </Box>
          {!isLoading && orders && orders.length > 0 ? (
            orders.map((item) => {
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
                        <Checkbox
                          {...label}
                          color="default"
                          value={item.productId}
                          checked={selected.includes(item.productId)}
                          onChange={(e) => {
                            handleChooseProduct(e);
                            console.log(
                              ">>>is Checked???:",
                              e.target.checked,
                              typeof item.id
                            );
                            // setIsCheck(e.target.checked);
                          }}
                        />
                      </Item>
                    </Grid>
                    <Grid xs={3}>
                      <Item>
                        <img
                          alt="hinhanh"
                          src={item.Product.imageToBase64}
                          style={{ height: "56px", witdh: "56px" }}
                        />
                        <Box>
                          <Item sx={{ height: "30px", fontWeight: 500 }}>
                            {item.Product.name}
                          </Item>
                          <Item>{toVnd(item.Product.price)}</Item>
                        </Box>
                      </Item>
                    </Grid>
                    <Grid xs={2}>
                      <Item>{item.Product.User.fullName}</Item>
                    </Grid>
                    <Grid xs={2}>
                      <Item>{item.User.fullName}</Item>
                    </Grid>
                    <Grid xs={2}>
                      <Item>{item.createdAt}</Item>
                    </Grid>
                    <Grid xs={1}>
                      <Item sx={{ overflow: "auto" }}>{item.statusName}</Item>
                    </Grid>
                    <Grid xs={1.5}>
                      <Item sx={{ flexDirection: "column" }}>
                        {item.statusName === "NEW" && (
                          <Action>
                            <AiFillSafetyCertificate />
                            &nbsp;&nbsp;Comfirm
                          </Action>
                        )}
                        {/* <Action>
                          <BsFillTrash3Fill />
                          &nbsp;&nbsp;Delete
                        </Action>
                        <Action>
                          <AiFillEdit />
                          &nbsp;&nbsp;Edit
                        </Action> */}
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
              <Typo16>No Product</Typo16>
            </Box>
          )}
          {selected.length > 0 && (
            <Actions>
              {sort === "new" && user.data.id === "R1" && (
                <ButtonAction
                  sx={{ backgroundColor: "var(--pinky)", marginRight: "20px" }}
                  onClick={() => {
                    setOpen(true);
                    setAction("confirm");
                  }}>
                  <AiFillSafetyCertificate />
                  &nbsp;&nbsp;CONFIRM
                </ButtonAction>
              )}
              {sort === "confirm" && user.data.typeRole === "R1" && (
                <ButtonAction
                  sx={{ backgroundColor: "black" }}
                  onClick={() => {
                    setOpen(true);
                    setAction("delete");
                  }}>
                  <MdDone />
                  &nbsp;&nbsp;COMPLETE ORDER
                </ButtonAction>
              )}
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

export default OrdersManage;

const Item = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  height: "80px",
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
  "&:hover": {
    color: "var(--pinky)",
  },
}));

const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100px",
  // width: "360px",
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
