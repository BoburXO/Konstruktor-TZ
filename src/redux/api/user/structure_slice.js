import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  loading: false,
  structure: {},
  activeSection: {},
  classificator: {},
  fieldsData: [],
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

export const fetchClassificator = createAsyncThunk(
  "classificatorForUser/fetchAll",
  async () => {
    const { request } = useHttp();
    return await request({
      url: `/classificator/all`,
      headers: {
        Authorization:
          `Bearer ` + localStorage.getItem("ConstructorRoleAccessToken"),
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
    setFieldsData: (state, { payload }) => {
      const { section_id, field_id, field_uz, field_ru, json_data, image } =
        payload;
      state.fieldsData.push({
        section_id: section_id,
        id: field_id,
        field_uz: field_uz || null,
        field_ru: field_ru || null,
        json_data: json_data || null,
        image: image || null,
      });
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
      })
      .addCase(fetchClassificator.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassificator.fulfilled, (state, { payload }) => {
        state.classificator = payload;
        state.loading = false;
      });
  },
});

export default userStructureSlice.reducer;
export const { setActiveSection, setFieldsData } = userStructureSlice.actions;
