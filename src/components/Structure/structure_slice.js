import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
  isFetchingStructuresLoading: false,
  isCreatingStructuresLoading: false,
  isPublishingLoading: false,
  templatesLoading: false,
  structures: {},
  currentStructure: {},
  structureAction: "create",
  publishedStructure: {},
  templates: [],
};

export const fetchStructureById = createAsyncThunk(
  "structure/findById",
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

export const createNewStructure = createAsyncThunk(
  "structure/createNewOne",
  async (data) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: "/constructor/create/list",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const updateStructure = createAsyncThunk(
  "structure/update",
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

export const deleteStructure = createAsyncThunk(
  "structure/delete",
  async () => {}
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

export const publishStructure = createAsyncThunk(
  "structure/publish",
  async (id) => {
    const { request } = useHttp();
    return await request({
      method: "PATCH",
      url: `/constructor/detail/${id}`,
      data: {
        is_draft: false,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {
    setActiveSectionId: (state, { payload }) => {
      state.activeSectionId = payload;
    },
    clearStructure: (state) => {
      state.currentStructure = {};
      state.structures = {};
      state.publishedStructure = {};
    },
    setStructureAction: (state, { payload }) => {
      state.structureAction = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //findStructureById
      .addCase(fetchStructureById.pending, (state) => {
        state.isFetchingStructuresLoading = true;
      })
      .addCase(fetchStructureById.fulfilled, (state, { payload }) => {
        state.structures = payload;
        state.isFetchingStructuresLoading = false;
      })
      //creatingNewStructures
      .addCase(createNewStructure.pending, (state) => {
        state.isCreatingStructuresLoading = true;
      })
      .addCase(createNewStructure.fulfilled, (state, { payload }) => {
        state.currentStructure = payload;
        state.isCreatingStructuresLoading = false;
      })
      .addCase(createNewStructure.rejected, (state) => {
        state.isCreatingStructuresLoading = "error";
      })
      //update structure
      .addCase(updateStructure.pending, (state) => {
        state.isCreatingStructuresLoading = true;
      })
      .addCase(updateStructure.fulfilled, (state, { payload }) => {
        state.structures = payload;
        state.isCreatingStructuresLoading = false;
      })
      .addCase(fetchTemplates.pending, (state) => {
        state.templatesLoading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, { payload }) => {
        state.templates = payload;
        state.templatesLoading = false;
      })
      .addCase(publishStructure.pending, (state) => {
        state.isPublishingLoading = true;
      })
      .addCase(publishStructure.fulfilled, (state, { payload }) => {
        state.publishedStructure = payload;
        state.isPublishingLoading = false;
      });
  },
});

export default structureSlice.reducer;
export const { setActiveSectionId, clearStructure, setStructureAction } =
  structureSlice.actions;
