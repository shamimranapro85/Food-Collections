import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../featured/axios";


export const userAsyncData = createAsyncThunk(
  "user/fetchData",
  async (data) => {
    try {
      console.log(data);
      
      const response = await axiosInstance.post(data.url, data.user, {
        withCredentials: true,
      });
      return data?.user
    } catch (error) {
      console.log(error);
    }
  }
);

const DefaultSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    userObserve: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsyncData.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userAsyncData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
export const { userObserve } = DefaultSlice.actions;
