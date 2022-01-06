import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import WatchList from "../components/WatchList";
import CoinDetailPage from "./CoinDetailPage";

function Pages() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/watch-list" exact element={<WatchList />} />
      <Route path="/coins/:id" exact element={<CoinDetailPage />} />
    </Routes>
  );
}

export default Pages;
