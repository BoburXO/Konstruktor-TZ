import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../api/Api";
import axios from "axios";

const initialState = {
  branches: [1, 2, 3, 4, 5, 6, 7, 8],
  activeBranch: 1,
  isLoading: false,
  smth: [],
};

export const getActiveRoleTzStructure = createAsyncThunk(
  "roles/fetchRoleStructure",
  async () => {
    const response = await axios.get(`${API}/constructor/create/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
    return response.data;
  }
);

const tzStructureSlice = createSlice({
  name: "tzStructure",
  initialState,
  reducers: {
    setActiveBranch: (state, { payload }) => {
      state.activeBranch = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveRoleTzStructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveRoleTzStructure.fulfilled, (state, { payload }) => {
        state.smth = payload;
        state.isLoading = false;
      });
  },
});

export default tzStructureSlice.reducer;
export const {} = tzStructureSlice.actions;
