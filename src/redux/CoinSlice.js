import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  fav: [],
  details: [],
  trends: [],
  explanation: [],
  page: 1,
};

export const getCoinExp = createAsyncThunk("coin/exp", async (id) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return res.data;
});

export const getCoinDetails = createAsyncThunk("coin/details", async (id) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  return res.data;
});

export const getCoin = createAsyncThunk("coin/get", async (pages) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pages}&sparkline=false`
  );
  return res.data;
});

export const CoinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    addFav: (state, action) => {
      if (!state.fav.find((e) => e.id === action.payload.id)) {
        state.fav.push(action.payload);
      }
      localStorage.setItem("fav", JSON.stringify(state.fav));
    },
    changePages: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [getCoin.pending]: (state, action) => {
      state.status = "pending";
    },
    [getCoin.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [getCoin.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [getCoinDetails.pending]: (state, action) => {
      state.status = "pending";
    },
    [getCoinDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.status = "success";
    },
    [getCoinDetails.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [getCoinExp.pending]: (state, action) => {
      state.status = "pending";
    },
    [getCoinExp.fulfilled]: (state, action) => {
      state.explanation = action.payload;
      state.status = "success";
    },
    [getCoinExp.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { addFav, changePages } = CoinSlice.actions;
export default CoinSlice.reducer;
