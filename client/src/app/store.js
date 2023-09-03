import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import votesReducer from "../features/votes/votesSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    votes: votesReducer,
  },
});
