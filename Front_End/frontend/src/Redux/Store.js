import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User/UsersSlice';
const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
export default store;