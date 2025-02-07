import { Route, Router, Routes, useLocation, useNavigate } from "react-router";
import Dashboard from "../pages/home/Dashboard";
import Notfound from "../pages/shared/Notfound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/ForgotePassword";
import { useEffect } from "react";
import { auth } from "../firebase/firebase.confige";
import { useDispatch, useSelector } from "react-redux";
import { userAsyncData } from "../redux/slice/userSlice";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Spinner from "../pages/shared/Spinner";

import AvailableFood from "../pages/featured/AllAvailableFoods/AvailableFood";
import AddFood from "../pages/featured/AddFood/AddFood";
import Private from "../pages/private/Private";
import { Flip, toast, ToastContainer } from "react-toastify";
import { functionStore } from "../redux/slice/exportFronComponents";
import useInterceptor from "../featured/axios";
import ManageMyFoods from "../pages/featured/ManageMyFoods/ManageMyFoods";
import MyFoodRequest from "../pages/featured/MyFoodRequest/MyFoodRequest";
import Home from "../pages/home/Home";
import ViewDetails from "../pages/featured/View Details/ViewDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export const AllRouter = () => {
  const axiosInstance = useInterceptor();
  const Selected_UserDAta = useSelector((state) => state.UserSate);
  const fetchAnyDataSate = useSelector((state) => state.fetchAnyDataState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ====================dynamic rout title
  const { pathname } = useLocation();

  const onLoginOutClick = (message) => {
    signOut(auth);
    toast.warning("LogOut", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
    return navigate("/login");
  };

  const currentPath = pathname.split("/")[1];
  useEffect(() => {
    dispatch(functionStore({ onLoginOutClick }));
    document.title =
      pathname == "/"
        ? "Home | FoodOrder"
        : currentPath.charAt(0).toUpperCase() +
          currentPath.slice(1).toLowerCase() +
          " | FoodOrder";
    return () => {};
  }, [pathname]);
  // ====================dynamic rout title

  // =============== user observed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userAsyncData({ url: "/login", user: user }));
      } else {
        dispatch(userAsyncData({ url: "/logout" }));
      }
    });

    return () => unsubscribe();
  }, []);
  // =============== user observed

  if (Selected_UserDAta.loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/availablefoods" element={<AvailableFood />}></Route>
        <Route
          path="/addFood"
          element={
            <Private>
              <AddFood />
            </Private>
          }
        ></Route>
        <Route
          path="/mymanagefoods"
          element={
            <Private>
              <QueryClientProvider client={queryClient}>
                <ManageMyFoods />
              </QueryClientProvider>
            </Private>
          }
        ></Route>
        <Route
          path="/myfoodrequest"
          element={
            <Private>
              <MyFoodRequest />
            </Private>
          }
        ></Route>
        <Route
          path="/food/:id"
          element={
            <Private>
              <ViewDetails />
            </Private>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Notfound />}></Route>
    </Routes>
  );
};
