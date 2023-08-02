import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
const initialState = {
  id: "",
  loading: false,
  message: {},
  duplicateLoading: false,
  duplicatedTz: {},
};

export const doubleAndFillTz = createAsyncThunk(
  "tz/doubleForFill",
  async ({ id, data }) => {
    const { request } = useHttp();
    return await request({
      method: "PATCH",
      url: `/constructor/detail/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const duplicateTzForUser = createAsyncThunk(
  "tz/duplicate",
  async (id) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: `/constructor/duplicate/constructor?constructor_id=${id}`,
      data: {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

const lkavtorSlice = createSlice({
  name: "lkavtor",
  initialState,
  reducers: {
    setTzIdForFilling: (state, { payload }) => {
      state.id = payload;
    },
    clearDuplicatedAndDoubledTz: (state) => {
      state.message = {};
      state.duplicatedTz = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doubleAndFillTz.pending, (state) => {
        state.loading = true;
      })
      .addCase(doubleAndFillTz.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.loading = false;
      })
      .addCase(duplicateTzForUser.pending, (state) => {
        state.duplicateLoading = true;
      })
      .addCase(duplicateTzForUser.fulfilled, (state, { payload }) => {
        state.duplicatedTz = payload;
        state.duplicateLoading = false;
      });
  },
});

export default lkavtorSlice.reducer;
export const { setTzIdForFilling, clearDuplicatedAndDoubledTz } =
  lkavtorSlice.actions;
