import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../featured/axios";


// 1. Create an async thunk action for making an API call
export const fetchAnyData = createAsyncThunk(
  "fetchAnyData/fetchData",
  async (url) => {
    const response = await axiosInstance.get(url);
    console.log(response);

    return response;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "fetchAnyData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
