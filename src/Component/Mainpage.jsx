import { Container } from "@chakra-ui/react";
import Home from "./Home/Home";
import { Outlet } from "react-router-dom";

const Mainpage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Mainpage;
