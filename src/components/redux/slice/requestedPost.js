import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../featured/axios";
import axios from "axios";

// 1. Create an async thunk action for making an API call
export const fetchRequestedFood = createAsyncThunk(
  "requestedPost/fetchData",
  async (payload) => {
    const response = await axios.post(
      import.meta.env.VITE_baseURL + payload.url,
      payload.data
    );
    return response;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "requestedPost",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestedFood.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestedFood.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRequestedFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
