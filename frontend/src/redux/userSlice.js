import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, city: null },
  reducers: {
    setUserData: (state, acion) => {
      state.userData = acion.payload;
    },
    setCity: (state, acion) => {
      state.city = acion.payload;
    },
  },
});

export const { setUserData, setCity } = userSlice.actions;
export default userSlice.reducer;
