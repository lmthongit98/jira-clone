import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { StorageKeys } from '../../constants/index';

// export const register = createAsyncThunk('user/register', async (payload) => {
//   const data = await userApi.register(payload);
//   localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//   localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
//   return data.user;
// });

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);
  localStorage.setItem(StorageKeys.TOKEN, data?.content?.accessToken);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data?.content));
  return data.content;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      state.current = {};
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
    },
  },
  extraReducers: {
    // [register.fulfilled]: (state, action) => {
    //   state.current = action.payload;
    // },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
