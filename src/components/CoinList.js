import React from "react";
import { useDispatch } from "react-redux";
import { addFav } from "../redux/CoinSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import favImg from "../assets/star.png";
import { toast } from "react-toastify";

export default function CoinList({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  id,
}) {
  const items = useSelector((state) => state.coin.items);
  const favlocal = JSON.parse(localStorage.getItem("fav"));

  const dispatch = useDispatch();

  const priceChangeFixed = priceChange.toFixed(3);
  const priceLocal = price.toLocaleString();
  const volumeLocal = volume.toLocaleString();

  const notify = () => {
    toast("Added To Watch List", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="flex items-center">
          <Link to={`/coins/${id}`}>
            <div className="flex flex-row justify-center items-center h-20 border-2 w-[650px] p-3">
              <div className="flex items-center pr-8 min-w-[300px}">
                <img className="h-7 w-7 mr-2" src={image} alt="coin" />
                <h1 className="text-base w-[150px]">{name}</h1>
                <p className="uppercase">{symbol}</p>
              </div>
              <div className="flex text-center justify-between w-full">
                <p className="w-[110px] text-center">$ {priceLocal}</p>
                <p className="w-[160px]">$ {volumeLocal}</p>
                {priceChange < 0 ? (
                  <p className="text-red-600">{priceChangeFixed} %</p>
                ) : (
                  <p className="text-green-600">{priceChangeFixed} %</p>
                )}
              </div>
            </div>
          </Link>
          <button
            className="h-8 w-12 ml-1"
            onClick={() => {
              notify();
              dispatch(
                addFav({
                  name,
                  image,
                  symbol,
                  priceLocal,
                  volumeLocal,
                  priceChange,
                  id,
                  priceChangeFixed,
                })
              );
            }}
          >
            <img className="h-6 w-6 ml-2" src={favImg} alt="fav" />
          </button>
        </div>
      </div>
    </div>
  );
}
