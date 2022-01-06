import { configureStore } from "@reduxjs/toolkit";
import CoinSlice from "./CoinSlice";

export default configureStore({
  reducer: {
    coin: CoinSlice,
  },
});
