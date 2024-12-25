import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosBaseUrl, axiosInstance } from "../../featured/axios";

// 1. Create an async thunk action for making an API call
export const FetchSingleData = createAsyncThunk(
  "fetchSingleData/fetchData",
  async (url) => {
    const response = await axiosBaseUrl.get(url);
    return response;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "fetchSingleData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchSingleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchSingleData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(FetchSingleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
