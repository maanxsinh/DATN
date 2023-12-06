import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/index";
import { createTheme, ThemeProvider } from "@mui/material";
import Upload from "./pages/Users/Upload";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Message from "./components/Message";
import Manage from "./components/Manage";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import TheMap from "./components/GgMap";
import AdminManage from "./pages/Admin";
import Management from "./pages/Users/Management";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mess" element={<Message />} />
        <Route path="/manage" element={<Management />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/map" element={<TheMap />} />
        <Route path="/admin" element={<AdminManage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
