import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isSuperAdmin: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isSuperAdmin = action.payload.isSuperAdmin;
    },
    logout: (state) => {
      state.token = null;
      state.isSuperAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
