import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massage);
    }
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categoriesList = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
