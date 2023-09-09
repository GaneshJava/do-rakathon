import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedNavKey: '',
  selectedNavLabel: '',
  selectedNavImgSrc: '',
}

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    updateNavBarChanges: (state, action) => {
      const { selectedNavKey, selectedNavImgSrc, selectedNavLabel } = action.payload;
      state.selectedNavKey = selectedNavKey;
      state.selectedNavImgSrc = selectedNavImgSrc; 
      state.selectedNavLabel = selectedNavLabel;
    },
  },
})

export const updateNavBarChanges = navbarSlice.actions.updateNavBarChanges;
export const navbarReducer = navbarSlice.reducer;
