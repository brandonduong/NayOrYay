import { createSlice } from "@reduxjs/toolkit";

export const votesSlice = createSlice({
  name: "votes",
  initialState: {
    value: [],
  },
  reducers: {
    setVotes: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVotes } = votesSlice.actions;

export default votesSlice.reducer;
