import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    userName: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setLoading, setAuthUser, setUserName } = authSlice.actions;
export default authSlice.reducer;
