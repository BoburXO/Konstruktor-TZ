import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
import { useReducer } from "react";

const initialState = {
  tzList: {},
  loading: false,
  deleteLoading: false,
  deletedTz: {},
};

export const fetchAllTzOfUser = createAsyncThunk(
  "userTz/fetchAll",
  async ({ page = 1, tz_name, is_draft = "both" }) => {
    const { request } = useHttp();
    let url = `/constructor/list/user?page=${page}`;
    if (tz_name) {
      url += `&tz_name=${tz_name}`;
    }
    if (is_draft !== "both") {
      url += `&is_draft=${is_draft}`;
    }

    return await request({
      url,
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
      state.tzList = {};
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
