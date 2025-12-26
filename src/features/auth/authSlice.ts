import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name?: string;
  token: string;
  role?: string;
}

interface AuthState {
  userInfo: User | null;
}

const getStoredUser = (): User | null => {
  try {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse stored user info", error);
    return null;
  }
};

const initialState: AuthState = {
  userInfo: getStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
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
