import { configureStore } from "@reduxjs/toolkit";
import DefaultReducer from "../slice/DefaultSlice";
import userReducer from "../slice/userSlice";
import fetchAnyDataReducer from "../slice/FetchAnyData";
import PostDataReducer from "../slice/postData";
import exportReducer from "../slice/exportFronComponents";
import fetchSingleDataReducer from "../slice/fetctSingleData";
import fetchAllAvailableFoodReducer from "../slice/allAvailableFood";
import fatechRequestFoodReducer from "../slice/requestedPost";
import myRequestedFodReducer from "../slice/myRequestedFod";
const store = configureStore({
  reducer: {
    DefaultSate: DefaultReducer,
    UserSate: userReducer,
    fetchAnyDataState: fetchAnyDataReducer,
    functionState: exportReducer,
    postDataState: PostDataReducer,
    fetchSingleDataState: fetchSingleDataReducer,
    fetchAvailableFoodState: fetchAllAvailableFoodReducer,
    fatechRequestFoodState: fatechRequestFoodReducer,
    myRequestedFodState: myRequestedFodReducer,
  },
});

export { store };
