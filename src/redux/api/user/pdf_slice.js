import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/useHttp";

const initialState = {
    loading: false,
    pdf: {},
}

export const uploadPdf = createAsyncThunk("pdf/upload", async (id) => {
    const { request } = useHttp();
    return await request({
        method: "POST",
        url: `/constructor/upload/pdf`,
        data: {
            result_id: id
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("CnstructorRoleAccessToken")}`
        }
    })
})

const pdfSlice = createSlice({
    name: "pdf",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPdf.pending, (state) => state.loading = true)
            .addCase(uploadPdf.fulfilled, (state, { payload }) => {
                state.pdf = payload;
                state.loading = false
        })
    }
})

export const {} = pdfSlice.actions;
export default pdfSlice.reducer;