import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
import { useReducer } from "react";

const initialState = {
  tzList: [],
  loading: false,
  deleteLoading: false,
  deletedTz: {},
};

export const fetchAllTzOfUser = createAsyncThunk(
  "userTz/fetchAll",
  async ({ page = 1, tz_name }) => {
    const { request } = useHttp();
    return await request({
      url: tz_name
        ? `/constructor/list/user?&page=${page}&tz_name=${tz_name}`
        : `/constructor/list/user?&page=${page}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const deleteTz = createAsyncThunk("tz/delete", async (id) => {
  const { request } = useHttp();
  return await request({
    method: "DELETE",
    url: `/constructor/delete?constructor_id=${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "ConstructorRoleAccessToken"
      )}`,
    },
  });
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearTz: (state) => {
      state.tzList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTzOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTzOfUser.fulfilled, (state, { payload }) => {
        state.tzList = payload;
        state.loading = false;
      })
      .addCase(deleteTz.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTz.fulfilled, (state, { payload, meta }) => {
        if (payload === "") {
          state.deletedTz = meta.arg;
        }
        state.deleteLoading = false;
      });
  },
});

export const { clearTz } = profileSlice.actions;
export default profileSlice.reducer;
