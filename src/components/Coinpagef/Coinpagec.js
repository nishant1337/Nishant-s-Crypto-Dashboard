import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { SingleCoin } from "../../config/Api";
import axios from "axios";
import Coininfoc from "../Coininfof/Coininfoc";
import "./Coinpagec.css";
const Coinpagec = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { Currency, Symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };


  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div>
      <div className="sidebar">
        <img className="logo" src={coin?.image.large} alt={coin?.name}></img>
        <div className="desc">{coin?.description.bg.split(". ")[0]}</div>
        <div className="rank">Rank: {coin?.market_cap_rank}</div>
        <div className="cprice">
          Current Price:{" "}
          {Symbol}{coin?.market_data.current_price[Currency.toLowerCase()]}
        </div>
        <div className="cmcap">
          Market Cap:{" "}
          {Symbol}{coin?.market_data.market_cap[Currency.toLowerCase()].toString()}
        </div>
      </div>

      <div className="chart">
        <Coininfoc coin={coin}></Coininfoc>
      </div>
    </div>
  );
};

export default Coinpagec;
