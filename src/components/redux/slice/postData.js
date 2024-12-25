import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../featured/axios";

// 1. Create an async thunk action for making an API call
export const postData = createAsyncThunk("postData/fetchData", async (payload) => {
  const response = await axiosInstance.post(payload.url, payload.data);
  return response;
});

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "postData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
