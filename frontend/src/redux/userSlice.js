import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
  },
  reducers: {
    setUserData: (state, acion) => {
      state.userData = acion.payload;
    },
    setCurrentCity: (state, acion) => {
      state.currentCity = acion.payload;
    },
    setCurrentState: (state, acion) => {
      state.currentState = acion.payload;
    },
    setCurrentAddress: (state, acion) => {
      state.currentState = acion.payload;
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
} = userSlice.actions;
export default userSlice.reducer;
