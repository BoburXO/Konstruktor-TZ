import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";
const initialState = {
  id: "",
  loading: false,
  message: {},
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

const lkavtorSlice = createSlice({
  name: "lkavtor",
  initialState,
  reducers: {
    setTzIdForFilling: (state, { payload }) => {
      state.id = payload;
    },
    clearMessage: (state) => {
      state.message = {};
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
      });
  },
});

export default lkavtorSlice.reducer;
export const { setTzIdForFilling, clearMessage } = lkavtorSlice.actions;
