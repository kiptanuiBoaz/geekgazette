import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './navSliceInitState';

const navSlice = createSlice({
  name: 'navState',
  initialState,
  reducers: {
    setReading: (state, action: PayloadAction<boolean>) => {
      state.reading = action.payload;
    },
    setOpenProfile: (state, action: PayloadAction<boolean>) => {
        state.openProfile = action.payload;
    }
  },
});

export const { setReading,setOpenProfile } = navSlice.actions;

export const selectReading = (state:any) => state.navState.reading;
export const selectOpenProfile = (state:any) => state.navSlice.open;

export default navSlice.reducer;
