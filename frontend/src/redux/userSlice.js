import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null },
  reducers: {
    setUserData: (state, acion) => {
      state.userData = acion.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
