import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import secureLocalStorage from "react-secure-storage";
import { secureLocalStorage } from 'helpers/secureLocalStorage';
import { __response } from 'api/apiHelper';

import {
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  IS_AUTHENTICATED,
  USER_OBJ
} from 'api/constants';
import { loginUser, logoutUser } from 'api/userService';
// eslint-disable-next-line no-unused-vars
import { apiService } from 'api';

const userAuthState = () => {
  return {
    isAuthenticated: Number(secureLocalStorage.getItem(IS_AUTHENTICATED)) ? true : false,
    user: secureLocalStorage.getItem(USER_OBJ) || { tenantId: 'rak01', id: 'user123' },
    accessToken: secureLocalStorage.getItem(ACCESS_TOKEN) || '',
    refreshToken: secureLocalStorage.getItem(REFRESH_TOKEN) || ''
  }
};


export const userSignIn = createAsyncThunk(
  AUTH_SIGN_IN,
  async (postData) => {
    const response = await __response(apiService.post(AUTH_SIGN_IN, postData))
    return response;
  }
);

export const userSignOut = createAsyncThunk(
  AUTH_SIGN_OUT,
  async (postData) => {
    // const response = await apiService.post(AUTH_SIGN_OUT, postData);
    logoutUser();
    return 1;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: userAuthState(),
  reducers: {
    configLogin: (state, action) => {
      const { data } = action.payload;
      let accessToken = data?.accessToken ?? '';
      let refreshToken = data?.refreshToken ?? '';
      loginUser({ accessToken, refreshToken, userObject: data })
      return userAuthState()
    },
  },
  extraReducers: (builder) => {
    builder
      //userSignOut response handling reducers
      .addCase(userSignOut.fulfilled, () => userAuthState())
  },
});

export const authState = (state) => state.auth;
export const configLogin = authSlice.actions.configLogin;
export const userAuthReducer = authSlice.reducer;
