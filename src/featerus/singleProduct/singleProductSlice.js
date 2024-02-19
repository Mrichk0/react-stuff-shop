import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getSingleProduct = createAsyncThunk(
  "singleProduct/getSingleProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massage);
    }
  }
);
const singleProductSlice = createSlice({
  name: "singleProducts",
  initialState: {
    product: {},
    isLoading: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
      state.isLoading = false;
    });
    builder.addCase(getSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default singleProductSlice.reducer;
