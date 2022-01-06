import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinDetails } from "../redux/CoinSlice";
import { useParams } from "react-router-dom";
import { getCoinExp } from "./../redux/CoinSlice";

export default function CoinDetails() {
  const dispatch = useDispatch();
  const param = useParams();

  const details = useSelector((state) => state.coin.details);
  const explanation = useSelector((state) => state.coin.explanation);

  useEffect(() => {
    dispatch(getCoinDetails(param.id));
    dispatch(getCoinExp(param.id));
  }, [dispatch]);

  return (
    <div className="flex">
      {details.map((item) => (
        <div key={item.name} className="ml-36 ">
          {item.name ? (
            <div className="flex items-center bg-slate-100  h-[50%] p-2 border-2 w-[480px] mt-8  ">
              <img className="w-8 h-8" src={item.image} alt="coin" />
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Highest Price Last 24h</th>
                    <th>Lowest Price Last 24h</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="ml-4 mr-4">{item.name}</div>
                    </td>
                    <td>
                      <div className="ml-4 mr-4"> ${item.current_price}</div>
                    </td>
                    <td>
                      <div className="ml-8">${item.high_24h}</div>
                    </td>
                    <td>
                      <div className="ml-8"> ${item.low_24h}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
      {explanation.description ? (
        <div className="w-[600px] h-64 ml-4 mb-4 bg-slate-100 border-2 rounded-xl mt-8 p-2 overflow-y-scroll">
          {explanation.description.en}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
