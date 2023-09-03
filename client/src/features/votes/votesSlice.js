import { createSlice } from "@reduxjs/toolkit";

export const votesSlice = createSlice({
  name: "votes",
  initialState: {
    value: [],
    fetched: false,
  },
  reducers: {
    setVotes: (state, action) => {
      state.value = action.payload;
    },
    setFetched: (state, action) => {
      state.fetched = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVotes, setFetched } = votesSlice.actions;

export default votesSlice.reducer;
