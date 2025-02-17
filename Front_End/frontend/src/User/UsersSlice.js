import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'Users Slice ',
  initialState: {
    email: '',
  },
  reducers: {
    setEmail(state, action) {
      console.log('State update', action);
      state.email = action.payload;
    },
  },
});

export const { setEmail } = userSlice.actions;
export default userSlice.reducer;