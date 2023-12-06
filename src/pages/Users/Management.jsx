import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Manage from "../../components/Manage";
import OrdersManage from "../../components/Manage/OrdersManage";
import { useDispatch, useSelector } from "react-redux";
import {
  managementAction,
  setRole,
  setRoleBuyer,
  setRoleSeller,
} from "../../Reducer/userSlice";
import { formatDate } from "../../utils/commonUtils";

const Management = () => {
  const dispatch = useDispatch();
  const [manage, setManage] = React.useState("");
  const roleManageOrders = useSelector((state) => state.manageSlice.role);
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleChange = (event) => {
    setManage(event.target.value);
    dispatch(setRole(event.target.value));
    const orders = "orders";
    const statusName = "NEW";
    const userId = user.data.id;
    // dispatch(managementAction({ orders, manage, userId, statusName }));
  };
  return (
    <Box>
      <Header />
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ width: "180px" }}>
          <InputLabel id="demo-simple-select-label">Manage</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manage}
            label="Manage"
            onChange={handleChange}>
            <MenuItem value="products">My Products</MenuItem>
            <MenuItem value="buyer">My Orders</MenuItem>
            <MenuItem value="seller">Customer's Orders</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {manage === "products" ? <Manage /> : <OrdersManage />}
    </Box>
  );
};

export default Management;
