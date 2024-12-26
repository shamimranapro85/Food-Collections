import { useEffect } from "react";
import { axiosBaseUrl, axiosInstance } from "../../../featured/axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../shared/Spinner";
import axios from "axios";

const fetchMyFoods = async () => {
  const response = await axiosBaseUrl.get("/");
  return response;
};

const ManageMyFoods = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myFoods"],
    queryFn: fetchMyFoods,
    staleTime: 5000,
    cacheTime: 5000,
  });

  useEffect(() => {
    axiosInstance.post("/checkToken");
  }, []);
  if (isLoading) return <Spinner></Spinner>;

  if (error) return <div>Error fetching data: {error.message}</div>;

  return <div>Manage my foods</div>;
};

export default ManageMyFoods;
