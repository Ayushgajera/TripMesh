import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet: {
    balance: 10,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.wallet.balance = action.payload;
      console.log("Updated balance:", state.wallet.balance);
    },
    
  },
});

export const { updateBalance } = userSlice.actions;
export default userSlice.reducer;