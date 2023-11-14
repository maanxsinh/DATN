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

const Manage = () => {
  const [sort, setSort] = useState("all");
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(null);
  const navigate = useNavigate();
  const product = useSelector((state) => state.loadProductSlice.product);
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
    const fetchProduct = async () => {
      const statusId = null;
      console.log(">>> current USER:", user.data);
      if (user.data.typeRole === "R1") {
        await loadingProduct(null, null, dispatch);
        console.log(">>> R1");
      } else {
        const IdAuthor = user.data.id;
        console.log(">>> R2");
        await loadingProduct(null, IdAuthor, dispatch);
      }
    };
    fetchProduct();
    console.log(">>> product:", product);
  }, []);

  const handleLoadConfirmProduct = async () => {
    setSort("confirm");
    setSelected([]);
    const statusId = "CONFIRMED";
    if (user.data.typeRole === "R1") {
      await loadingProduct(statusId, null, dispatch);
      console.log(">>> R1");
    } else {
      const IdAuthor = user.data.id;
      console.log(">>> R2");
      await loadingProduct(statusId, IdAuthor, dispatch);
    }
  };
  const handleLoadNewProduct = async () => {
    setSort("new");
    setSelected([]);
    const statusId = "NEW";
    if (user.data.typeRole === "R1") {
      await loadingProduct(statusId, null, dispatch);
      console.log(">>> R1");
    } else {
      const IdAuthor = user.data.id;
      console.log(">>> R2");
      await loadingProduct(statusId, IdAuthor, dispatch);
    }
  };
  const handleLoadAllProduct = async () => {
    setSort("all");
    setSelected([]);
    if (user.data.typeRole === "R1") {
      await loadingProduct(null, null, dispatch);
      console.log(">>> R1");
    } else {
      const IdAuthor = user.data.id;
      console.log(">>> R2");
      await loadingProduct(null, IdAuthor, dispatch);
    }
  };

  const handleChangeAll = (e) => {
    console.log(">>> value:", e.target.value, ">>>array:", selected);
    if (e.target.value === "0") {
      // if true
      const arrayIDitem = product.map((item) => item.id);
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
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80vw", margin: "0 0 80px 0" }}>
          <Sort>
            <Typo16
              onClick={() => handleLoadAllProduct()}
              sx={sort === "all" && { borderBottom: "4px solid black" }}>
              All
            </Typo16>
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
            <Typo20>
              Selected:&nbsp;{selected.length}/{product.length}
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
                <Head>Name</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Sort</Head>
              </Grid>
              <Grid xs={2}>
                <Head>Price</Head>
              </Grid>
              <Grid xs={1}>
                <Head>Warehouse</Head>
              </Grid>
              <Grid xs={2.5}>
                <Head>Description</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Actions</Head>
              </Grid>
            </Grid>
          </Box>
          {!isLoading && product && product.length > 0 ? (
            product.map((item) => {
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
                          value={item.id}
                          checked={selected.includes(item.id)}
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
                          src={item.imageToBase64}
                          style={{ height: "56px", witdh: "56px" }}
                        />
                        {item.name}
                      </Item>
                    </Grid>
                    <Grid xs={1.5}>
                      <Item>iPhone</Item>
                    </Grid>
                    <Grid xs={2}>
                      <Item>{item.price}</Item>
                    </Grid>
                    <Grid xs={1}>
                      <Item>1</Item>
                    </Grid>
                    <Grid xs={2.5}>
                      <Item sx={{ overflow: "auto" }}>{item.description}</Item>
                    </Grid>
                    <Grid xs={1.5}>
                      <Item sx={{ flexDirection: "column" }}>
                        {item.statusId === "NEW" && (
                          <Action>
                            <AiFillSafetyCertificate />
                            &nbsp;&nbsp;Comfirm
                          </Action>
                        )}
                        <Action>
                          <BsFillTrash3Fill />
                          &nbsp;&nbsp;Delete
                        </Action>
                        <Action>
                          <AiFillEdit />
                          &nbsp;&nbsp;Edit
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
                onClick={() => {
                  setOpen(true);
                  setAction("confirm");
                }}>
                <AiFillSafetyCertificate />
                &nbsp;&nbsp;CONFIRM
              </ButtonAction>
              <ButtonAction
                sx={{ backgroundColor: "#1F51FF" }}
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

export default Manage;

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
