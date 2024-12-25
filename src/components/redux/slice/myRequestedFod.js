import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../featured/axios";
import axios from "axios";

// 1. Create an async thunk action for making an API call
export const fetchMyRequestedFod = createAsyncThunk(
  "myRequestedFod/fetchData",
  async (payload) => {
    console.log(payload.data);

    const response = await axios.post(
      import.meta.env.VITE_baseURL + payload.url,
      { email: payload.data }
    );
    return response;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "myRequestedFod",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRequestedFod.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRequestedFod.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyRequestedFod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
