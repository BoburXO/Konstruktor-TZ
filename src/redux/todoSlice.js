import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        content_uz: action.payload.content_uz,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((el) => {
        return el.id !== action.payload;
      });
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
