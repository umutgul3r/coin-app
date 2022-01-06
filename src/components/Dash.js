import React from "react";
import { Link } from "react-router-dom";
import CoinList from "../assets/invoice.png";
import Like from "../assets/like.png";
import news from "../assets/world-news.png";

export default function Dash() {
  return (
    <div className="bg-gray-800 h-screen text-white w-32 flex items-center fixed left-0 ">
      <ul className="p-3">
        <Link className="flex mb-12 " to="/">
          <img className="h-10 w-10" src={CoinList} alt="" />
          <li className=" p-1 w-20">Coin List</li>
        </Link>
        <Link className="flex mb-12" to="watch-list">
          <img className="decoration-white h-10 w-10 " src={Like} alt="" />
          <li className="  p-1 w-20">Watch List</li>
        </Link>
        <Link className="flex" to="news">
          <img className="decoration-white h-10 w-10" src={news} alt="" />
          <li className="  p-1 w-20">News</li>
        </Link>
      </ul>
    </div>
  );
}
