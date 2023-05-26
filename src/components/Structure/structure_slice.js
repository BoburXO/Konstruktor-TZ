import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

const initialState = {
  isFetchingStructuresLoading: false,
  isCreatingStructuresLoading: false,
  structures: {},
  currentStructure: {},
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
      method: "PUT",
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

const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {
    setActiveSectionId: (state, { payload }) => {
      state.activeSectionId = payload;
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
        state.currentStructure = payload;
        state.isCreatingStructuresLoading = false;
      });
  },
});

export default structureSlice.reducer;
export const { setActiveSectionId } = structureSlice.actions;
