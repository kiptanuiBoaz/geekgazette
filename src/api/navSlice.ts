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
    },
    setPrevUrl:(state,action:PayloadAction<string>) => {
      state.prevUrl = action.payload;
    }
  },
});

export const { setReading, setOpenProfile,setPrevUrl } = navSlice.actions;

export const selectReading = (state: any) => state.navState.reading;
export const selectOpenProfile = (state: any) => state.navState.openProfile;  
export const selectPrevUrl = (state:any) => state.navState.prevUrl;

export default navSlice.reducer;
