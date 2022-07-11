import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { coinsuggestions } from "../../config/Data";
import { CoinList } from "../../config/Api";
import "./Portfolioc.css";
import axios from "axios";
import { waitFor } from "@testing-library/react";
const Portfolioc = () => {
  const [pfcoins, setpfcoins] = useState([]);
  const [coin, setcoin] = useState([]);

  const fetchcoins = async () => {
    const { data } = await axios.get(CoinList("USD"));
    setcoin(data);
  };

  const arr = [10, 2, 3, 4, 5,100];

  const arrmapped = arr.reduce((first, second) => {
    if ( second > first) {
        first=second
    }
    return second;
  }, 0);

  

  console.log(arrmapped);

  useEffect(() => {
    fetchcoins();
  }, []);

  return (
    <div className="portfolio">
      <div>Add coins to your portfolio</div>
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
          items={coinsuggestions}
          autoFocus
          onSelect={(e) => {
            console.log("from autoselect", e);
            setpfcoins([...pfcoins, e.name]);
          }}
        />
      </div>
    </div>
  );
};

export default Portfolioc;
