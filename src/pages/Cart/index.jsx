import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { FaLocationDot } from "react-icons/fa6";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MdCancel } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import DeliveryAdress from "../../components/DeliveryAdress";
import { getCart, getDeliveryAddress } from "../../Reducer/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toVnd } from "../../utils/commonUtils";

const Cart = () => {
  let x = 50000000;
  var y = 31000;
  // x = x.toLocaleString("vi", { style: "currency", currency: "VND" });
  y = y.toLocaleString("vi", { style: "currency", currency: "VND" });
  let z = x + y;
  const [shipping, setShipping] = React.useState("");
  const [selected, setSelected] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCartSlice.cart);
  const authorArr = useSelector((state) => state.getCartSlice.authorArr);
  const infAddress = useSelector(
    (state) => state.deliveryAddressSlice.deliveryAddress
  );

  useEffect(() => {
    const getProductInCart = async () => {
      await getCart(2, dispatch);
      await getDeliveryAddress(2, dispatch);
    };
    getProductInCart();
  }, []);

  const handleTestApi = () => {
    console.log(">>>infAddress:", infAddress);
  };

  const handleChange = (event) => {
    setShipping(event.target.value);
  };

  const handleChangeAll = (e) => {
    console.log(">>> value:", e.target.value, ">>>array:", selected);
    if (e.target.value === "0") {
      // if true
      const arrayIDitem = cart.map((item) => item.Product.id);
      console.log(">>>arrayIDitem:", arrayIDitem);
      setSelected(arrayIDitem); // select all
      const arrPrice = cart.map((item) => {
        return item.Product.price;
      });
      const sum = arrPrice.reduce((partialSum, a) => partialSum + a, 0);
      setSumPrice(sum);
      console.log(">>>arrPrice:", sum);
    } else {
      // if false
      setSelected([]); // unselect all
      setSumPrice(0);
    }
    console.log(">>> value:", typeof e.target.value);
  };

  const handleChooseProduct = (e) => {
    let value = parseInt(e.target.value, 10);
    let price = parseInt(e.target.name, 10);
    const isExist = selected.includes(value);
    console.log(">>>isExist:", typeof price);
    console.log(">>>isExist2:", typeof value);
    if (!isExist) {
      // if true
      setSelected([...selected, value]); // add to selected
      setSumPrice(sumPrice + price);
      console.log(">>>TRUE:", sumPrice);
    } else {
      // if false
      setSelected(selected.filter((item) => item !== value));
      setSumPrice(sumPrice - price); // remove from selected
      console.log(">>>FALSE:", selected);
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  if (cart.length > 0 && authorArr.length > 0) {
    return (
      <Box sx={{ backgroundColor: "rgba(0,0,0,.06)", height: "2000px" }}>
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
            position: "fixed",
            bottom: 0,
          }}>
          <Total>
            <CheckoutItems>
              <Checkbox
                {...label}
                color="error"
                value={selected.length}
                checked={selected.length}
                onChange={(e) => handleChangeAll(e)}
              />
              <Typo15>
                Select All ({selected.length}/{cart.length})
              </Typo15>
              <Typo15>Delete All </Typo15>
            </CheckoutItems>
            <CheckoutItems>
              <Typo15 sx={{ display: "flex", alignItems: "center" }}>
                Total ({selected.length} items):
                <Typography sx={{ fontSize: "26px", color: "var(--pinky)" }}>
                  &nbsp;{toVnd(sumPrice)}
                </Typography>{" "}
              </Typo15>
              <ButtonCheckout>Check out</ButtonCheckout>
            </CheckoutItems>
          </Total>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0",
          }}>
          <Typography
            sx={{
              fontSize: "26px",
              width: "80vw",
              borderBottom: "1px solid #cccccc",
              padding: "20px 0",
            }}>
            My Cart
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "80vw" }}>
            <Box sx={{ color: "var(--pinky)" }}>
              <FaLocationDot />
              &nbsp;&nbsp;Delivery Address
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typo15 sx={{ fontWeight: 500 }}>
                {infAddress.fullName}&nbsp;&nbsp;({infAddress.phoneNumber})
              </Typo15>
              <Typo15>{infAddress.address}</Typo15>

              <DeliveryAdress />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "30px 148px",
            }}>
            {authorArr.length > 0 &&
              authorArr.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: "80vw",
                    backgroundColor: "white",
                    boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    margin: "0 0 20px 0",
                  }}>
                  <Grid xs={12}>
                    <Item
                      sx={{
                        height: "50px",
                        borderBottom: "1px solid #cccccc",
                      }}>
                      {/* <Checkbox
                        {...label}
                        color="default"
                        value={selected.length}
                        checked={selected.length}
                        onChange={(e) => handleChangeAll(e)}
                      /> */}
                      {item}&nbsp;&nbsp;
                      <AiTwotoneShop style={{ fontSize: "120%" }} />
                    </Item>
                  </Grid>
                  {cart.map((itemPro) => {
                    if (itemPro.authorName === item) {
                      return (
                        <>
                          <Grid xs={4}>
                            <Item sx={{ display: "flex" }}>
                              <Checkbox
                                {...label}
                                color="error"
                                value={itemPro.Product.id}
                                name={itemPro.Product.price}
                                checked={selected.includes(itemPro.Product.id)}
                                onChange={(e) => {
                                  handleChooseProduct(e);
                                }}
                              />
                              <img
                                src={itemPro.imageToBase64}
                                alt="HInh anh"
                                style={{ height: "80px", width: "80px" }}
                              />
                              <Typo14>
                                &nbsp;&nbsp;{itemPro.Product.name}
                              </Typo14>
                            </Item>
                          </Grid>
                          <Grid xs={2}></Grid>
                          <Grid xs={2}>
                            <Item>{toVnd(itemPro.Product.price)}</Item>
                          </Grid>
                          <Grid xs={1.5}>
                            <Item>
                              <DivQuantity>
                                <Button>—</Button>
                                <Label>1</Label>
                                <input
                                  type="text"
                                  style={{ display: "none" }}
                                />
                                <Button sx={{ fontSize: "16px" }}>+</Button>
                              </DivQuantity>
                            </Item>
                          </Grid>
                          <Grid xs={2}>
                            <Item>{toVnd(itemPro.Product.price)}</Item>
                          </Grid>
                          <Grid xs={0.3}>
                            <MdCancel
                              style={{ fontSize: "25px", color: "#7f7f7f" }}
                            />
                          </Grid>
                        </>
                      );
                    }
                  })}
                  <Grid xs={8}>
                    <Item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Shipping
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={shipping}
                          onChange={handleChange}
                          label="Shipping Methods">
                          <MenuItem value={10}>Quickly</MenuItem>
                          <MenuItem value={20}>Savings</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid xs={1.5}>
                    <Item>
                      <Typo14>Receive in 3 days</Typo14>
                    </Item>
                  </Grid>
                  <Grid xs={2}>
                    <Item>{y}</Item>
                  </Grid>
                </Grid>
              ))}
          </Box>
        </Box>

        <button onClick={() => handleTestApi()}>Test api</button>
      </Box>
    );
  }
};

export default Cart;

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "119px",
  //   border: "1px solid green",
}));

const Typo15 = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  margin: "15px 15px 15px 0",
}));

const Typo14 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));

const DivQuantity = styled("div")(({ theme }) => ({
  border: "1px solid #999999",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "42px",
  width: "130px",
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
  padding: "0px 30px",
  fontSize: "16px",
}));

const Total = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "80vw",
  height: "130px",
  backgroundColor: "white",
  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  margin: "0 0 20px 0",
}));

const CheckoutItems = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "20px",
}));

const ButtonCheckout = styled("button")(({ theme }) => ({
  backgroundColor: "var(--pinky)",
  height: "45px",
}));

// if (cart.length > 0 && authorArr.length > 0) {
//   authorArr.map((item) => {
//     // for (let i = 0; i++; i < cart.length) {
//     //   if (cart[i].authorName === item) {
//     //     <Box>masn sinh</Box>;
//     //   }
//     // }
//     return <Box>{item}</Box>;
//   });
// } else {
//   return <Box>Man Van Sinh</Box>;
// }
// if (cart.length > 0 && authorArr.length > 0) {
//   return (
//     <Box>
//       {authorArr.map((item) => {
//         return (
//           <div>
//             <div>{item}</div>
//             {cart.map((itemPro) => {
//               if (itemPro.authorName === item) {
//                 return (
//                   <div>
//                     <div>{itemPro.authorName}</div>
//                     <div>{itemPro.id}</div>
//                   </div>
//                 );
//               }
//             })}
//           </div>
//         );
//       })}
//       <button onClick={() => checkAPI()}>check</button>
//     </Box>
//   );
// }
