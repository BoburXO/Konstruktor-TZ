import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  isCreatingSectionLoading: false,
  isCreatingSubSectionLoading: false,
  currentSection: {},
  currentSubSection: {},
  deletedSection: {},
  activeSectionId: "",
};
export const createNewSection = createAsyncThunk(
  "section/createSection",
  async (data) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: "/constructor/section/create",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const createNewSubSection = createAsyncThunk(
  "subSection/createSubSection",
  async (data) => {
    const { request } = useHttp();
    return await request({
      method: "POST",
      url: "/constructor/section/create",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const updateSection = createAsyncThunk(
  "section/update",
  async ({ id, data }) => {
    const { request } = useHttp();
    return await request({
      method: "PUT",
      url: `/constructor/section/detail/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const updateSubSection = createAsyncThunk(
  "subsection/update",
  async ({ id, data }) => {
    const { request } = useHttp();
    return await request({
      method: "PUT",
      data,
      url: `/constructor/section/detail/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

export const deleteSection = createAsyncThunk("section/delete", async (id) => {
  const { request } = useHttp();
  return await request({
    url: `/constructor/section/delete`,
    method: "DELETE",
    data: {
      section_id: id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "ConstructorRoleAccessToken"
      )}`,
    },
  });
});

export const deleteSubSection = createAsyncThunk(
  "delete/subSection",
  async (id) => {
    const { request } = useHttp();
    return await request({
      method: "DELETE",
      url: `/constructor/section/delete`,
      data: { section_id: id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    });
  }
);

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setActiveSectionId: (state, { payload }) => {
      state.activeSectionId = payload;
    },
    setCurrentSection: (state, { payload }) => {
      state.currentSection = payload;
    },
    clearSection: (state) => {
      state.currentSection = {};
      state.deletedSection = {};
      state.activeSectionId = "";
      state.currentSubSection = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewSection.pending, (state) => {
        state.isCreatingSectionLoading = true;
      })
      .addCase(createNewSection.fulfilled, (state, { payload }) => {
        state.currentSection = payload;
        state.activeSectionId = payload.id;
        state.isCreatingSectionLoading = false;
      })
      //creatingNewSubSection
      .addCase(createNewSubSection.pending, (state, { payload }) => {
        state.isCreatingSubSectionLoading = true;
      })
      .addCase(createNewSubSection.fulfilled, (state, { payload }) => {
        state.currentSubSection = payload;
        state.isCreatingSubSectionLoading = false;
      })
      //updateSection
      .addCase(updateSection.pending, (state) => {
        state.isCreatingSectionLoading = true;
      })
      .addCase(updateSection.fulfilled, (state, { payload }) => {
        state.currentSection = payload;
        state.isCreatingSectionLoading = false;
      })
      //updateSubSection
      .addCase(updateSubSection.pending, (state) => {
        state.isCreatingSubSectionLoading = true;
      })
      .addCase(updateSubSection.fulfilled, (state, { payload }) => {
        state.currentSubSection = payload;
        state.isCreatingSubSectionLoading = false;
      })
      //deleteSection
      .addCase(deleteSection.pending, (state) => {
        state.isCreatingSectionLoading = true;
      })
      .addCase(deleteSection.fulfilled, (state, { payload }) => {
        state.currentSection = {};
        state.isCreatingSectionLoading = false;
      })
      //deleteSubSection
      .addCase(deleteSubSection.pending, (state) => {
        state.isCreatingSubSectionLoading = false;
      })
      .addCase(deleteSubSection.fulfilled, (state) => {
        state.currentSubSection = {};
        state.isCreatingSubSectionLoading = false;
      });
  },
});

export const { setActiveSectionId, setCurrentSection, clearSection } =
  sectionSlice.actions;
export default sectionSlice.reducer;
