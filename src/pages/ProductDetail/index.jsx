import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import Header from "../../components/Header";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import commonUtils from "../../utils/commonUtils";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import axios from "axios";
import { showAllMessage, showMessage } from "../../Reducer/messageSlice";

const ProductDetail = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const showMess = useSelector((state) => state.messageSlice.showMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productDetail.data);

  useEffect(() => {
    // console.log(">>>image:", data.imageToBase64);
  }, []);
  const handleContact = async () => {
    let ID1 = currentUser.data.id;
    let ID2 = data.User.id;
    await commonUtils.createConversation(
      currentUser,
      navigate,
      axios,
      ID1,
      ID2
    );
    dispatch(showAllMessage());
    dispatch(showMessage());
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "4rem",
          display: "flex",
          justifyContent: "center",
          height: "3000px",
        }}>
        <Item>
          <div>
            <img
              alt="productImage"
              src={data.imageToBase64}
              style={{
                height: "586px",
                width: "586px",
                border: "1px solid #cccccc",
              }}
            />
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "70px",
                }}>
                <Typo20>Reviews</Typo20>
                <Span13>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;★★★★★ (12)</Span13>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "26px",
                  width: "240px",
                  margin: "20px 0",
                  borderBottom: "1px solid #999999",
                }}>
                <Typo14 sx={{ width: "120px" }}>All comment</Typo14>
                <Typo14 sx={{ width: "120px" }}>Recently</Typo14>
              </Box>

              <div className="comments">
                <Comment>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <div style={{ display: "flex" }}>
                      <img
                        src="https://ctl.s6img.com/society6/img/ux7XmmpT7rPeH_Z-9-G-En904Ro/w_50,h_50/artwork/~artwork/s6-0037/u/17139598_10325942"
                        style={{ height: "25px", width: "25px" }}
                      />
                      <Typo12>&nbsp;&nbsp;&nbsp;moop</Typo12>
                      <Span13>&nbsp;&nbsp;&nbsp;★★★★★</Span13>
                    </div>
                    <Typo12>5 months ago</Typo12>
                  </div>
                  <Typo14 sx={{ marginTop: "5px" }}>Excellent!</Typo14>
                </Comment>
              </div>
            </div>
          </div>
        </Item>
        <Item>
          <div style={{ marginLeft: "42px" }}>
            <Typo20 gutterBottom>{data.name}</Typo20>
            <Typo16 gutterBottom>by {data.User.fullName}</Typo16>
            <Span13>★★★★★</Span13>
            <Span13 sx={{ marginLeft: "10px" }}>1 review</Span13>
            <Typo16 sx={{ marginTop: "75px", fontWeight: "500" }} gutterBottom>
              {data.price}
            </Typo16>
            <Typo16 sx={{ marginTop: "40px" }} gutterBottom>
              MODEL
            </Typo16>
            <Select>
              <option value="iPhone 15 promax">iPhone 15</option>
              <option value="iPhone 15 promax">iPhone 15</option>
            </Select>
            <Typo16 sx={{ marginTop: "40px" }} gutterBottom>
              QUANTITY
            </Typo16>
            <DivQuantity>
              <Button>—</Button>
              <Label>1</Label>
              <input type="text" style={{ display: "none" }} />
              <Button sx={{ fontSize: "16px" }}>+</Button>
            </DivQuantity>
            <BtBuyNow>Buy Now</BtBuyNow>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <BtAddToCart sx={{ width: "49%" }}>
                <BsCartPlus style={{}} />
                &nbsp;&nbsp;Add To Cart
              </BtAddToCart>
              <BtAddToCart
                sx={{ width: "49%" }}
                onClick={() => handleContact()}>
                <AiOutlineMessage style={{ color: "white" }} />
                &nbsp;&nbsp;Contact
              </BtAddToCart>
            </Box>

            <Box sx={{ width: "520px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "30px 0",
                  marginTop: "30px",
                  borderTop: "1px solid #cccccc",
                }}>
                <AiOutlineInfoCircle style={{ fontSize: "20px" }} />
                <Typo20>&nbsp;&nbsp;Description</Typo20>
              </Box>

              <Typo14>
                Our iPhone Slim Case combines premium protection with brilliant
                design. The thin phone case profile keeps your tech looking
                sleek and compact, while guarding against scuffs and scratches.
                Just snap it onto the case and you’re good to go.
              </Typo14>
            </Box>
          </div>
        </Item>
      </Box>
      <Message />
    </>
  );
};

export default ProductDetail;

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: "center",
  // color: theme.palette.text.secondary,
  // width: "586px",
  height: "2000px",
  // border: "1px solid black",
}));
const Span13 = styled("span")(({ theme }) => ({
  fontSize: "13px",
}));
const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: "0px",
}));
const Typo12 = styled("div")(({ theme }) => ({
  fontSize: "12px",
}));

const Typo14 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));
const Typo20 = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
}));

const Select = styled("select")(({ theme }) => ({
  height: "50px",
  width: "520px",
  fontSize: "16px",
  padding: "10px",
  marginTop: "10px",
}));
const Option = styled("option")(({ theme }) => ({
  padding: "16px",
  margin: "16px",
}));

const Button = styled("button")(({ theme }) => ({
  border: "none",
  textAlign: "center",
  backgroundColor: "white",
  color: "black",
  height: "40px",
  width: "40px",
  padding: "0",
  cursor: "pointer",
}));

const Label = styled("label")(({ theme }) => ({
  textAlign: "center",
  padding: "0px 50px",
  fontSize: "16px",
}));

const Comment = styled("div")(({ theme }) => ({
  borderBottom: "1px solid #cccccc",
  height: "67px",
  width: "586px",
}));

const DivQuantity = styled("div")(({ theme }) => ({
  marginTop: "16px",
  border: "1px solid #999999",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "42px",
  width: "195px",
}));

const BtAddToCart = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginTop: "16px",
  border: "1px solid black",
  borderRadius: "5px",
  height: "53px",
  width: "520px",
  color: "white",
  backgroundColor: "black",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
}));

const BtBuyNow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginTop: "16px",
  border: "1px solid #db214c",
  borderRadius: "5px",
  height: "53px",
  width: "520px",
  color: "white",
  backgroundColor: "#db214c",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "rgba(219, 33, 76,0.8)",
  },
}));
