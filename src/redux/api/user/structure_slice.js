import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  loading: false,
  structure: {},
  activeSection: {},
};

export const fetchStructureByIdForUser = createAsyncThunk(
  "structureForUser/fetchById",
  async (id) => {
    const { request } = useHttp();
    return await request({
      url: `/constructor/detail/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

const userStructureSlice = createSlice({
  name: "userStructure",
  initialState,
  reducers: {
    setActiveSection: (state, { payload }) => {
      state.activeSection = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStructureByIdForUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStructureByIdForUser.fulfilled, (state, { payload }) => {
        state.structure = payload;
        state.loading = false;
      });
  },
});

export default userStructureSlice.reducer;
export const { setActiveSection } = userStructureSlice.actions;
