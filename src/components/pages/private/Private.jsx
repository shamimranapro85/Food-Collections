import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { TokenVerify } from "../../redux/slice/TokenValidation";
import useInterceptor from "../../featured/axios";
import Spinner from "../shared/Spinner";

const Private = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
 
  const functionState = useSelector((state) => state.functionState);
  

  const Selected_UserDAta = useSelector((state) => state.UserSate);

  const axiosInstance = useInterceptor();

  if (Selected_UserDAta.loading) {
    return <Spinner></Spinner>;
  }
  if (Selected_UserDAta.user) {
    return <>{children}</>;
  } else {
    navigate("/login", { state: location.pathname });
  }
};

export default Private;
