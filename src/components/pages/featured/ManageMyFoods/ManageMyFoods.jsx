import { useEffect } from "react";
import { axiosInstance } from "../../../featured/axios";


const ManageMyFoods = () => {
    useEffect(()=>{
        axiosInstance.post("/checkToken")
    })
    return (
        <div>
            Manage my foods
        </div>
    );
};

export default ManageMyFoods;