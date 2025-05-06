import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet: {
    balance: 0,
    transactions: []
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.wallet.balance = Number(action.payload);
    }
  }
});

export const { updateBalance } = userSlice.actions;
export default userSlice.reducer;