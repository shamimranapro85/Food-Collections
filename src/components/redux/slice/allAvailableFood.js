import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosBaseUrl, axiosInstance } from "../../featured/axios";

// 1. Create an async thunk action for making an API call
export const fetchAllAvailableFood = createAsyncThunk(
  "allAvailableFood/fetchData",
  async (url) => {
    const response = await axiosBaseUrl.get(url);
    return response;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "allAvailableFood",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAvailableFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAvailableFood.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllAvailableFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
