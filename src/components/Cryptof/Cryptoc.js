import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Crypto } from "../../CryptoContext";
import { CoinList } from "../../config/Api";
import "./Cryptoc.css";
import { ProgressBar, Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

const Cryptoc = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { Currency, Symbol } = useContext(Crypto);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(Currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [Currency]);

  const convertToCurrency = (money) => {
    return money.toString().length;
  };

  const coinslist = coins.slice(page * 20 - 20, page * 20).map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    let color = profit == true ? "green" : "red";
    return (
      <tr key={coin.name}>
        <td> {coin.market_cap_rank}</td>

        <td className="icon-symbol">
          <Link to={`/coins/${coin.id}`}>
            <img src={coin?.image} alt={coin.name} className="coin-img" />
          </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>

        <td>
          {Symbol}
          {coin.current_price}
        </td>
        <td>
          {" "}
          {Symbol}
          {coin.ath}
        </td>
        <td className={color}>{coin.price_change_percentage_24h}</td>
        <td>
          {" "}
          {Symbol}
          {convertToCurrency(coin.market_cap)}
        </td>
        {coin.total_supply == null ? (
          <td>
            {" "}
            <ProgressBar animated variant="danger" now={100} label="N/A" />
          </td>
        ) : (
          <td>
            {" "}
            <ProgressBar
              className="supply"
              now={Math.round(
                (coin.circulating_supply / coin.total_supply) * 100
              )}
              label={
                Math.round(
                  (coin.circulating_supply / coin.total_supply) * 100
                ) + "%"
              }
            />{" "}
          </td>
        )}
      </tr>
    );
  });

  return (
    <div className="coinlist">
      <Table responsive="sm" borderless className="table-main">
        <thead>
          <tr className="table-header">
            <th>Rank</th>
            <th>Symbol</th>
            <th>Coin name</th>
            <th>Last Price</th>
            <th>ATH</th>
            <th>24H %</th>
            <th>Mcap</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>{coinslist}</tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        />
        <Pagination.Item>Move</Pagination.Item>

        <Pagination.Next
          onClick={() => {
            if (page < 10) {
              setPage(page + 1);
            }
          }}
        />
      </Pagination>
    </div>
  );
};

export default Cryptoc;
