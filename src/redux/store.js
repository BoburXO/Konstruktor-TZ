import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";
import structure from "../components/Structure/structure_slice";
import section from "../components/Structure/CreateNewSectionModal/section_slice";
import field from "../components/Structure/CreateNewFieldModal/field_slice";
import lkavtor from "../pages/LKavtor/lkavtor_slice";

import userStructure from "./api/user/structure_slice";
import profile from "../pages/Profile/profile_slice";

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
    structure,
    section,
    field,
    userStructure,
    lkavtor,
    profile,
  },
  devTools: process.env.NODE_ENV !== "production",
});
