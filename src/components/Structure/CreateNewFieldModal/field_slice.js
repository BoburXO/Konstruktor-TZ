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

export const updateField = createAsyncThunk(
  "field/update",
  async ({ data, id }) => {
    const { request } = useHttp();
    return await request({
      method: "PATCH",
      url: `/constructor/field/update/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const deleteField = createAsyncThunk("field/delete", async (id) => {
  const { request } = useHttp();
  return await request({
    method: "DELETE",
    url: `/constructor/field/delete`,
    data: {
      field_id: id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "ConstructorRoleAccessToken"
      )}`,
    },
  });
});

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //createField
      .addCase(createNewField.pending, (state) => {
        state.isCreatingFieldLoading = true;
      })
      .addCase(createNewField.fulfilled, (state, action) => {
        console.log(action);
        state.currentField = action.payload;
        state.isCreatingFieldLoading = false;
      })
      //updateField
      .addCase(updateField.pending, (state) => {
        state.isCreatingFieldLoading = true;
      })
      .addCase(updateField.fulfilled, (state, { payload }) => {
        state.currentField = payload;
        state.isCreatingFieldLoading = false;
      })
      //deleteField
      .addCase(deleteField.pending, (state) => {
        state.isCreatingFieldLoading = true;
      })
      .addCase(deleteField.fulfilled, (state) => {
        state.currentField = {};
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
