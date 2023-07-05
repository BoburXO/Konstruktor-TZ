import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
import { useReducer } from "react";

const initialState = {
  tz: [],
  loading: false,
  deleteLoading: false,
  deletedTz: {},
};

export const fetchAllTzOfUser = createAsyncThunk(
  "userTz/fetchAll",
  async (page = 1) => {
    const { request } = useHttp();
    return await request({
      url: `/constructor/list/user?page=${page}`,
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
    url: `/constructor/detail/user/${id}`,
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
      state.tz = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTzOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTzOfUser.fulfilled, (state, { payload }) => {
        state.tz = payload;
        state.loading = false;
      })
      .addCase(deleteTz.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTz.fulfilled, (state, { payload }) => {
        state.deletedTz = payload;
        state.deleteLoading = false;
      });
  },
});

export const { clearTz } = profileSlice.actions;
export default profileSlice.reducer;
