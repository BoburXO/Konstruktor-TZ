import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  loading: false,
  structure: {},
  activeSection: {},
  classificator: {},
  fieldsData: [],
  data: {},
  userAction: "edit",
  templatesLoading: false,
  templates: [],
};

export const fetchStructureByIdForUser = createAsyncThunk(
  "structureForUser/fetchById",
  async (id) => {
    const { request } = useHttp();
    return await request({
      url: `/constructor/detail/user/${id}`,
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

export const sendAllFieldsData = createAsyncThunk(
  "fieldsData/sendAll",
  async ({ id, data }) => {
    const { request } = useHttp();
    console.log(data);
    return await request({
      method: "PUT",
      url: `/constructor/section/field/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const fetchTemplates = createAsyncThunk(
  "templates/fetchAll",
  async (id) => {
    const { request } = useHttp();
    return await request({
      url: `/constructor/section/detail/${id}`,
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
    setFieldsData: (state, { payload }) => {
      const {
        section_id,
        field_id,
        field_uz,
        field_ru,
        json_data,
        image,
        select_type,
      } = payload;
      const idx = state.fieldsData?.findIndex((item) => item?.id === field_id);
      if (idx < 0) {
        state.fieldsData.push(
          select_type === 6
            ? {
                id: field_id,
                section_id: section_id,
                json_data: json_data,
              }
            : select_type === 7
            ? {
                section_id: section_id,
                id: field_id,
                image: image,
              }
            : {
                section_id: section_id,
                id: field_id,
                field_uz: field_uz,
                field_ru: field_ru,
              }
        );
      } else {
        state.fieldsData[idx].field_ru = field_ru;
        state.fieldsData[idx].field_uz = field_uz;
        state.fieldsData[idx].json_data = json_data;
        state.fieldsData[idx].image = image;
      }
    },
    clearFieldsData: (state) => {
      state.fieldsData = [];
    },
    setUserAction: (state, { payload }) => {
      state.userAction = payload;
    },
    clearStructureForUser: (state) => {
      state.activeSection = {};
      state.structure = {};
      state.classificator = {};
      state.fieldsData = [];
      state.data = {};
      state.templates = [];
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
      })
      .addCase(sendAllFieldsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendAllFieldsData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(fetchTemplates.pending, (state) => {
        state.templatesLoading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, { payload }) => {
        state.templates = payload;
        state.templatesLoading = false;
      });
  },
});

export default userStructureSlice.reducer;
export const {
  setActiveSection,
  setFieldsData,
  clearFieldsData,
  setUserAction,
  clearStructureForUser,
} = userStructureSlice.actions;
