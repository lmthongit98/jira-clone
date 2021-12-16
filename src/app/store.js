import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import projectReducer from '../features/Project/projectSlice';

const rootReducer = {
  userReducer,
  projectReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
