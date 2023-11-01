import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/index";
import { createTheme, ThemeProvider } from "@mui/material";
import Upload from "./pages/Users/Upload";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Message from "./components/Message";

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
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mess" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
