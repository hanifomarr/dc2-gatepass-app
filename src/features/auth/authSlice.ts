import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: string | null;
}

const storedUserInfo = localStorage.getItem("userInfo");

const initialState: AuthState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
