import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import votesReducer from "../features/votes/votesSlice";
import questionsReducer from "../features/questions/questionsSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    votes: votesReducer,
    questions: questionsReducer,
  },
});
