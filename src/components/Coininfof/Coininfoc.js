import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/Api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { render } from "@testing-library/react";
import { Chart }            from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { chartDays } from "../../config/Data";
import './Coininfoc.css'

import SelectButtonc from "../SelectButtonf/SelectButtonc";
const Coininfoc = ({ coin  }) => {
  const { id } = useParams();

  const { Currency, Symbol } = CryptoState();

  const [historicalData, setHistoriacalData] = useState();
  const [days, setDays] = useState(10);
  const [flag, setflag] = useState(false);

  const getHistoric = async () => {
    console.log(id)
    const { data } = await axios.get(HistoricalChart(id, days, Currency));
    setHistoriacalData(data.prices)
    console.log("HISTPORIAAAL",historicalData)
  };

  useEffect(() => {
    getHistoric();
  }, [Currency, days]); 

  return (
    <div>
      <div >
        {!historicalData ? (
          <span>Loading</span>
          
        ) : (
          <>
                     <div
            
            >
              {chartDays.map((day) => (
                <SelectButtonc
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButtonc>
              ))}
            </div>
            <Line className="chart"
              data={{
                labels: historicalData.map((coine) => {
                  let date = new Date(coine[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coine) => coine[1]),
                    label: `Price ( Past ${days} Days ) in ${Currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={
                
                {
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

          </>
        )}
      </div>
    </div>
  );
};

export default Coininfoc;
