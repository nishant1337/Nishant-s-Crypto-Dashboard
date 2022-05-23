import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FearGreedc.css";
import { Alert } from "react-bootstrap";
import ReactSpeedometer from "react-d3-speedometer";
import { Line } from "react-chartjs-2";

const FearGreedc = () => {
  const [fearhistory, setfearhistory] = useState([]);
  const [currfear, setcurrfear] = useState();
  const [variant, setvariant] = useState();

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const link = `https://alternative.me/images/fng/crypto-fear-and-greed-index-${date}.png`;

  const getFear = async () => {
    const res = await axios.get(
      "https://api.alternative.me/fng/?limit=100&date_format=us"
    );
    const { data } = res.data;
    setcurrfear(parseInt(data[0].value));
    console.log(currfear)
    if (  0 < currfear < 46 ) {
      setvariant("danger");
    } else if ( 46< currfear < 54) {
      setvariant("secondary");
    } else if (54< currfear < 100) {
      setvariant("success");
    } else {
      setvariant("dark");
    }

    setfearhistory(data);
  };

  useEffect(() => {
    getFear();
  }, []);

  const comp = fearhistory.map((each) => {
    return (
      <div>
        <div>
          {" "}
          {each.timestamp} {each.value} - {each.value_classification}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Alert variant={variant} className="warning">
        Market is in Fear ! Current Fear Index is : {currfear}
      </Alert>

      <div className="time-until">Fear & Greed Index</div>
      {/* 
      <img
        className="fearimg"
        src="https://alternative.me/crypto/fear-and-greed-index.png"
        alt="Latest Crypto Fear & Greed Index"
      />

  */}

      <ReactSpeedometer
        value={10}
        segments={5}
        customSegmentStops={[0, 25, 46, 54, 75, 100]}
        minValue={0}
        maxValue={100}
        needleHeightRatio={0.5}
        customSegmentLabels={[
          {
            text: "Extreme Fear",
            position: "INSIDE",
            color: "rgb(184,77,42)",
            fontSize: "8px",
            color: "white",
          },
          {
            text: "Bad",
            position: "INSIDE",
            color: "rgb(218,136,37)",
            fontSize: "8px",
            color: "white",
          },
          {
            text: "Ok",
            position: "INSIDE",
            color: "rgb(225,197,40)",
            fontSize: "19px",
            fontSize: "8px",
            color: "white",
          },
          {
            text: "Good",
            position: "INSIDE",
            color: "rgb(179,207,42)",
            fontSize: "8px",
            color: "white",
          },
          {
            text: "Very Good",
            position: "INSIDE",
            color: "rgb(79,186,44)",
            fontSize: "8px",
            color: "white",

          },
        ]}
        // startColor will be ignored
        // endColor will be ignored
      />
      <div>
        Fear & Greed History
        <Line
          className="charts"
          data={{
            labels: fearhistory.map((coine) => {
              let date = coine.timestamp;
              return date;
            }),

            datasets: [
              {
                data: fearhistory.map((coine) => coine.value),
                label: `Price`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            scales: {
              xAxis: {
                reverse: true,
              },
            },
            layout: {
              padding: 20,
            },

            elements: {
              point: {
                radius: 2,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default FearGreedc;
