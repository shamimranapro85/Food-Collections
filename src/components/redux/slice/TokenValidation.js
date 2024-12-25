import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../featured/axios";


export const TokenVerify = createAsyncThunk(
  "TokenValidation/fetchData",
  async (data) => {
    try {
      const response = await axiosInstance.post(data.url, data?.user);
      return data?.user;
    } catch (error) {
      console.log(error);
    }
  }
);

const DefaultSlice = createSlice({
  name: "TokenValidation",
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  // reducers: {
  //   userObserve: (state, action) => {
  //     state.data = action.payload;
  //     console.log(state.data);
  //     state.loading = false;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(TokenVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(TokenVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(TokenVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;

