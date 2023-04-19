import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";
import tzstructureSlice from "./tzstructure";

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
    tzstructure: tzstructureSlice,
  },
});
