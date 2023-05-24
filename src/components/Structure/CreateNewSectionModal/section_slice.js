import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  isCreatingSectionLoading: false,
  isCreatingSubSectionLoading: false,
  currentSection: {},
  currentSubSection: {},
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
      });
  },
});

export const { setActiveSectionId, setCurrentSection } = sectionSlice.actions;
export default sectionSlice.reducer;
