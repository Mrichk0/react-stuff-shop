import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shuffle } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massage);
    }
  }
);

export const findProducts = createAsyncThunk(
  "products/findProducts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products?title=${payload}`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.massage);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.productsList.filter(
        ({ price }) => price < payload
      );
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.productsList.filter(
        ({ category: { id } }) => id === payload
      );
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.productsList = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
