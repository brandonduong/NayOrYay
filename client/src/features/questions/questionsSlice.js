import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    value: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
