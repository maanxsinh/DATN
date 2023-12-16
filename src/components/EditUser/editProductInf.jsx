import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "../../Reducer/userSlice";

import SnackbarComponent from "../Snackbar";
import commonUtils, { setSnackbar, toVnd } from "../../utils/commonUtils";
import {
  resetInputEditProduct,
  setDataEditProduct,
  setDescriptionEdit,
  setImageEdit,
  setNameEdit,
  setPriceEdit,
  setSortEdit,
  setStatusEdit,
  setWarehouseEdit,
  setWeightEdit,
} from "../../Reducer/manageSlice";
import { editProduct } from "../../Reducer/apiRequest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProductInf() {
  const [open, setOpen] = React.useState(false);
  const [productImg, setProductImg] = React.useState({
    imgURL: null,
    image: null,
  });
  const [dataEdit, setDataEdit] = React.useState(null);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const productId = useSelector((state) => state.editProductSlice.productId);
  const [statusProduct, setStatusProduct] = React.useState(null);
  const dataSource = useSelector((state) => state.editProductSlice.dataSource);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.editProductSlice.dataEdit);

  const resetInput = () => {
    dispatch(resetInputEditProduct());
  };
  const handleClickOpen = () => {
    setOpen(true);
    // resetInput();
  };

  const noChangeBlank = () => {
    if (data.name === "") {
      dispatch(setNameEdit(null));
    }
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetData());
  };
  const handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await commonUtils.getBase64(file);
      dispatch(setImageEdit(base64));
      console.log(">>> IMAGE", base64);
      //   let objectUrl = URL.createObjectURL(file);
      //   setProductImg({
      //     imgURL: objectUrl,
      //     image: file,
      //   });
      //   console.log(">>> IMAGE", objectUrl);
    }
  };

  const handleEdit = async () => {
    if (
      dataSource.name === "" ||
      dataSource.sort === "" ||
      dataSource.price === "" ||
      dataSource.warehouse === "" ||
      dataSource.description === "" ||
      dataSource.weight === "" ||
      dataSource.status === null ||
      dataSource.status === "" ||
      dataSource.status === undefined
    ) {
      dispatch(
        setSnackbar("warning", "Please fill in the blank field", dispatch)
      );
    } else {
      setOpen(false);
      const IdAuthor = currentUser.id;
      await editProduct(dataSource, productId);
      dispatch(setSnackbar("success", "Edit product successfull!", dispatch));
    }
    console.log("---data Edit:", dataSource);
    console.log("check status:", statusProduct);
    console.log("check status:", dataSource.status);
    console.log("check product ID:", productId);
  };

  const setStatus = (e) => {
    setStatusProduct(e.target.value);
    dispatch(setStatusEdit(e.target.value));
  };

  const checkSort = (e) => {
    console.log("check sort:", dataSource.sort);
  };

  return (
    <React.Fragment>
      <SnackbarComponent />
      {/* <ButtonCreate onClick={handleClickOpen}>Create User</ButtonCreate> */}
      <Box onClick={handleClickOpen}>
        <AiFillEdit />
        &nbsp;&nbsp;Edit
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit Product Information"}</DialogTitle>
        <DialogContent>
          <Test>
            <Box sx={{ display: "flex", margin: "10px 0" }}>
              {/* <BiSolidLock style={{ color: "#6e6e6e" }} /> */}
              {/* <Typo11>&nbsp;&nbsp;Your information is secure.</Typo11> */}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "69%" }}>
                <label for="email">Name</label>
                <InputChild
                  value={dataSource?.name}
                  name="email"
                  placeholder={dataSource?.name}
                  onChange={(e) => {
                    dispatch(setNameEdit(e.target.value));
                  }}
                />
              </Input>
              <Input sx={{ width: "29%" }}>
                <label for="sort">Sort</label>
                <Select
                  value={dataSource?.sort}
                  onChange={(e) => {
                    dispatch(setSortEdit(e.target.value));
                    checkSort(e);
                  }}>
                  <option value=""></option>
                  <option value="iPhone">iPhone</option>
                  <option value="iPad">iPad</option>
                  <option value="iPhone Case">iPhone Case</option>
                </Select>
              </Input>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="fullName">Price</label>
                <InputChild
                  value={dataSource?.price}
                  placeholder={toVnd(dataSource?.price)}
                  name="fullName"
                  onChange={(e) => dispatch(setPriceEdit(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="password">Warehouse</label>
                <InputChild
                  value={dataSource?.warehouse}
                  placeholder={dataSource?.warehouse}
                  name="password"
                  type="text"
                  onChange={(e) => dispatch(setWarehouseEdit(e.target.value))}
                />
              </Input>
            </Box>
            <Input>
              <label for="address">Description</label>
              <InputChild
                value={dataSource?.description}
                placeholder={dataSource?.description}
                name="address"
                onChange={(e) => dispatch(setDescriptionEdit(e.target.value))}
              />
            </Input>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Input sx={{ width: "49%" }}>
                <label for="phoneNumber">Weight</label>
                <InputChild
                  value={dataSource?.weight}
                  placeholder={dataSource?.weight}
                  name="phoneNumber"
                  onChange={(e) => dispatch(setWeightEdit(e.target.value))}
                />
              </Input>
              <Input sx={{ width: "49%" }}>
                <label for="status">Status</label>
                <Select
                  value={statusProduct}
                  onChange={(e) => {
                    setStatusProduct(e.target.value);
                    // dispatch(setStatusEdit(statusProduct));
                    setStatus(e);
                  }}
                  sx={{ width: "230px" }}>
                  <option value={null}></option>
                  <option value="90%">90%</option>
                  <option value="80%">80%</option>
                  <option value="70%">70%</option>
                </Select>
              </Input>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Label for="file">Image</Label>
              <input
                type="file"
                id="file"
                name="file"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleOnchangeFile(e)}
              />
              {productImg.imgURL !== null && (
                <div
                  style={{
                    marginLeft: "20px",
                    borderRadius: "6px",
                    height: "93.78px",
                    width: "93.78px",
                  }}>
                  <img
                    src={productImg.imgURL === null ? "" : productImg.imgURL}
                    alt="img"
                    style={{
                      height: "93.78px",
                      width: "93.78px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              )}
            </Box>
          </Test>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit} sx={{ color: "var(--pinky)" }}>
            Confirm
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
const Label = styled("label")(({ theme }) => ({
  display: "inline-block",
  border: "1px dashed #999",
  padding: "30px",
  borderRadius: "6px",
  "&:hover": {
    border: "1px dashed #de0611",
    color: "#de0611",
  },
}));
