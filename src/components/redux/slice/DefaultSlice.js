import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Create an async thunk action for making an API call
export const fetchUserData = createAsyncThunk(
  "defaultReducer/fetchData",
  async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data = await response.json();
    return data;
  }
);

// 2. Create a slice (reducer + actions)
const DefaultSlice = createSlice({
  name: "defaultReducer",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    test: (state) => {
      state.value = 1;
    },

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DefaultSlice.reducer;
export const { test } = DefaultSlice.actions;
