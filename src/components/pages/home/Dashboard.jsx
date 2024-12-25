import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer";

const Dashboard = () => {
  const defaultState = useSelector((state) => state.DefaultSate);
  useEffect(() => {}, [defaultState]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Dashboard;
