import axios from "axios";
import React, { useEffect, useState , useContext} from "react";
import { TrendingCoins } from "../../config/Api";
import AliceCarousel from "react-alice-carousel";
import "./Trendingc.css";
import { Crypto } from "../../CryptoContext";
import { Link } from "react-router-dom";

const Trendingc = () => {
  const [Trending, setTrending] = useState([]);

  const { Currency, Symbol } = useContext(Crypto);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(Currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [Currency]);

  const items = Trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    let color = profit == true ? "green" : "red";

    return (
      <Link className="caraousel" to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} className="coin-img" />
        {coin?.symbol}
        &nbsp;
        <span className={color}>
          {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
        <span className="coin-price">
          {Symbol}
          {coin?.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });

  return (
    <div className="trending">
      <div className="titletrend">Trending Coins</div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={2}
        autoPlay
        items={items}
      ></AliceCarousel>
    </div>
  );
};

export default Trendingc;
