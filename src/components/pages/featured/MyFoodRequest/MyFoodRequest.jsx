import { useEffect } from "react";
import { axiosInstance } from "../../../featured/axios";

const MyFoodRequest = () => {
  useEffect(() => {
    axiosInstance.post("/checkToken");
  });
  return <div>manage my foods</div>;
};

export default MyFoodRequest;
