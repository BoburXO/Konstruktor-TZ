import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
  pdfLoading: false,
  pdf: {},
};

export const uploadPdf = createAsyncThunk("pdf/upload", async (id) => {
  const { request } = useHttp();
  return await request({
    method: "POST",
    url: `/constructor/upload/pdf`,
    data: {
      result_id: id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "ConstructorRoleAccessToken"
      )}`,
    },
  });
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    clearPdfStates: (state) => {
      state.pdf = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state) => {
        state.pdfLoading = true;
      })
      .addCase(uploadPdf.fulfilled, (state, { payload }) => {
        state.pdf = payload;
        state.pdfLoading = false;
      })
      .addCase(uploadPdf.rejected, (res, { error }) => {
        console.log(error.message);
      });
  },
});

export const { clearPdfStates } = pdfSlice.actions;
export default pdfSlice.reducer;
