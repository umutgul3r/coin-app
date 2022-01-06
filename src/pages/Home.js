import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoin, changePages } from "../redux/CoinSlice";
import { Link } from "react-router-dom";
import CoinList from "../components/CoinList";

function Home() {
  const [search, setSearch] = useState("");
  const items = useSelector((state) => state.coin.items);
  const pages = useSelector((state) => state.coin.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoin(1));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const next = () => {
    if (pages < 4) {
      dispatch(changePages(pages + 1));
      dispatch(getCoin(pages));
    }
  };

  const back = () => {
    if (pages > 0) {
      dispatch(changePages(pages - 1));
      dispatch(getCoin(pages));
    }
  };

  const filteredCoins = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-center mt-8 ml-4 w-full">
        <div className="mb-8 flex flex-col justify-center items-center text-base">
          <form>
            <input
              className="pl-4 w-[300px] h-12 border-2 border-black rounded-xl bg-blue-100"
              type="text"
              placeholder="Search"
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="flex mb-1">
          <button className="btn" onClick={back}>
            Back
          </button>
          <button className="btn" onClick={next}>
            Next
          </button>
        </div>
        <div className="w-[650px] bg-slate-100 flex flex-row gap-[100px] ml-[-52px] p-5">
          <div>Name</div>
          <div className="ml-4">İd</div>
          <div>Price</div>
          <div>Volume</div>
          <div>Change 24H</div>
        </div>

        {filteredCoins.map((item) => {
          return (
            <CoinList
              key={item.id}
              name={item.name}
              image={item.image}
              symbol={item.symbol}
              volume={item.total_volume}
              price={item.current_price}
              id={item.id}
              priceChange={item.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
