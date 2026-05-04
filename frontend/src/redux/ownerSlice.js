import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: { myShopData: null },
  reducers: {
    setMyShopData: (state, acion) => {
      state.myShopData = acion.payload;
    },
  },
});

export const { setMyShopData } = ownerSlice.actions;
export default ownerSlice.reducer;
