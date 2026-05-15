import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../constant";
import type { loginPayload, registerPayload } from "./auth";

interface AuthState {
  loading: boolean;
  error: string | null;
  user: any | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: loginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(loginApi, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: registerPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(registerApi, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
