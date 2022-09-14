import { createSlice } from '@reduxjs/toolkit'

export const tripSlice = createSlice({
  name: 'tripD',
  initialState: {
    selectedLocations: [],
    suggestions: [],
  },
  reducers: {
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    addSelectedLocation: (state, action) => {
      if (typeof action.payload === 'string')
        state.selectedLocations.push(action.payload);
      else {//array
        state.selectedLocations = action.payload;
      }
    },
    clear: (state) => {
      state.suggestions = [];
      state.selectedLocations = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSuggestions, addSelectedLocation, clear } = tripSlice.actions

export default tripSlice.reducer