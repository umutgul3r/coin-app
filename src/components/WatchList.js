import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addFav } from "../redux/CoinSlice";
import { toast } from "react-toastify";

export default function WatchList() {
  const favlocal = JSON.parse(localStorage.getItem("fav"));
  const fav = useSelector((state) => state.coin.fav);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = () => {
    toast("Watch List Deleted", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const removeFav = () => {
    localStorage.removeItem("fav");
    localStorage.setItem("fav", JSON.stringify([]));
    navigate("/");
    notify();
  };

  return (
    <div className="mt-12 w-full text-center">
      <div className="mb-4">
        <button
          className="bg-blue-400 font-bold relative m-1 left-72 text-white rounded-lg p-2"
          onClick={() => removeFav()}
        >
          Clear List
        </button>
      </div>

      {favlocal.map((item) => (
        <Link key={item.id} to={`/coins/${item.id}`}>
          <div className="flex justify-center">
            <div className="flex flex-row justify-center items-center h-20 border-2 w-[660px] p-4">
              <div className="flex items-center pr-8 min-w-[300px}">
                <img className="h-7 w-7 mr-2" src={item.image} alt="coin" />
                <h1 className="text-base w-[150px]">{item.name}</h1>
                <p className="uppercase">{item.symbol}</p>
              </div>
              <div className="flex text-center justify-between w-full">
                <p className="w-[110px]">$ {item.priceLocal}</p>
                <p className="w-[160px]">$ {item.volumeLocal}</p>
                {item.priceChange > 0 ? (
                  <p className="text-red-600">{item.priceChangeFixed} %</p>
                ) : (
                  <p className="text-green-600">{item.priceChangeFixed} %</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
