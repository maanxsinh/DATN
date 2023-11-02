import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "../../components/Header";

const Home = () => {
  // console.log(process.env.REACT_APP_PORT_API);
  // console.log(process.env);
  return (
    <>
      <div className="Header">
        <Header />
      </div>
      <div className="Content">
        <Content />
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </>
  );
};

export default Home;
