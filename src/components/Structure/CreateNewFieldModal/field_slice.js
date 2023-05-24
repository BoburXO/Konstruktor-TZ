import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  isCreatingFieldLoading: false,
  isFetchingClassificatorLoading: false,
  currentField: {},
  classificators: {},
};

export const createNewField = createAsyncThunk(
  "field/createNew",
  async (data) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: "/constructor/field/create",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const fetchAllClassificators = createAsyncThunk(
  "classificator, fetchAll",
  async () => {
    const { request } = useHttp();
    return await request({
      url: "/classificator/all",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewField.pending, (state) => {
        state.isCreatingFieldLoading = true;
      })
      .addCase(createNewField.fulfilled, (state, action) => {
        console.log(action);
        state.currentField = action.payload;
        state.isCreatingFieldLoading = false;
      })
      .addCase(fetchAllClassificators.pending, (state) => {
        state.isFetchingClassificatorLoading = true;
      })
      .addCase(fetchAllClassificators.fulfilled, (state, { payload }) => {
        state.classificators = payload;
        state.isFetchingClassificatorLoading = false;
      });
  },
});

export const {} = fieldSlice.actions;
export default fieldSlice.reducer;
