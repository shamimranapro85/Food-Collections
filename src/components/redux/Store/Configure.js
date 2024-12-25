import { configureStore } from "@reduxjs/toolkit";
import DefaultReducer from "../slice/DefaultSlice";
import userReducer from "../slice/userSlice";
import fetchAnyDataReducer from "../slice/FetchAnyData";
import PostDataReducer from "../slice/postData";
import exportReducer from "../slice/exportFronComponents";
const store = configureStore({
  reducer: {
    DefaultSate: DefaultReducer,
    UserSate: userReducer,
    fetchAnyDataState: fetchAnyDataReducer,
    functionState: exportReducer,
    postDataState: PostDataReducer,
  },
});

export { store };
