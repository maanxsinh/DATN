import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import UsersManage from "./Manage/UsersManage";
import Manage from "../../components/Manage";
import OrdersManage from "../../components/Manage/OrdersManage";

const Content = () => {
  const manage = useSelector((state) => state.manageSlice.manage);
  if (manage === "users") {
    return <UsersManage />;
  } else if (manage === "products") {
    return <Manage />;
  } else if (manage === "orders") {
    return <OrdersManage />;
  }
};

export default Content;
