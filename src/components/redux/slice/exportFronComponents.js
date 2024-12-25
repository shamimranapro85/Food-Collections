import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Create an async thunk action for making an API call
export const fetchUserData = createAsyncThunk(
  "exportFunction/fetchData",
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
  name: "exportFunction",
  initialState: {
    Funcs: {},
    loading: false,
    error: null,
  },
  reducers: {
    functionStore: (state, action) => {
      state.Funcs = action.payload;
    },
  },
});

export default DefaultSlice.reducer;
export const { functionStore } = DefaultSlice.actions;
