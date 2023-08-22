import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
const initialState = {
  id: "",
  loading: false,
  isDoubleStrucLoading: false,
  duplicateLoading: false,
  message: {},
  duplicatedTz: {},
  doubledStructure: {},
};

export const doubleStructure = createAsyncThunk(
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

export const duplicateTz = createAsyncThunk("tz/duplicate", async (id) => {
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
});

export const doubleStructureForModerator = createAsyncThunk(
  "structure/doubleForModerator",
  async (id) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: `/constructor/detail/${id}`,
      data: {
        is_double: true,
      },
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
      .addCase(doubleStructure.pending, (state) => {
        state.loading = true;
      })
      .addCase(doubleStructure.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.loading = false;
      })
      .addCase(duplicateTz.pending, (state) => {
        state.duplicateLoading = true;
      })
      .addCase(duplicateTz.fulfilled, (state, { payload }) => {
        state.duplicatedTz = payload;
        state.duplicateLoading = false;
      })
      .addCase(doubleStructureForModerator.pending, (state) => {
        state.isDoubleStrucLoading = true;
      })
      .addCase(doubleStructureForModerator.fulfilled, (state, { payload }) => {
        state.doubledStructure = payload;
        state.isDoubleStrucLoading = false;
      });
  },
});

export default lkavtorSlice.reducer;
export const { setTzIdForFilling, clearDuplicatedAndDoubledTz } =
  lkavtorSlice.actions;
