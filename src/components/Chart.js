import React, {  useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoState } from "../CryptoContext";
import "../CSS/chart.css"
import axios from "axios";
import { HistoricalChart } from "../config/api";
function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value
          .toString()
          .slice(0, -9)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data }) => {
  return (
    <div className="question">
    <div className="question-container">
    <ResponsiveContainer height={"80%"} width={"99%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey="prices"
          stroke="gold"
          strokeWidth="2px"
          dot={false}
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" />
        <YAxis dataKey={"prices"} domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
       </ResponsiveContainer>
        </div>
        </div>
  );
};
const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();

  const { currency } = CryptoState();

  const [days, setDays] = useState(1);

//function for converting minutes to doubledigits if they are in single 
  const minutes= (min) =>{
    if(min<10) min= '0' + min;
    return min;
  }
  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        
        const {data} = await axios.get(HistoricalChart(id,days,currency))
    
        let convertedData = data.prices.map((item) => {
          let dates = new Date(item[0]);
          // console.log(dates);
          // console.log(dates.getMinutes());
          let time =
            dates.getHours() > 12
              ? `${dates.getHours() - 12}:${minutes(dates.getMinutes())} PM`
              : `${dates.getHours()} : ${minutes(dates.getMinutes())} AM`;
          let ans = days === 1 ? time : dates.toLocaleDateString();
          return {
            // date: new Date(item[0]).toLocaleDateString(),
            date: ans,
            prices: item[1],
          };
        });

        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };
    getChartData(id);
  }, [id, days, currency]);
  return (
    <div className="chartt">
      <ChartComponent data={chartData} />
      <div className="btns">
        <button className="btn" onClick={() => setDays(1)}>
          1D
        </button>
        <button className="btn" onClick={() => setDays(7)}>
          7D
        </button>
        <button className="btn" onClick={() => setDays(30)}>
          30D
        </button>
        <button className="btn" onClick={() => setDays(365)}>
          1Y
        </button>
      </div>
    </div>
  );
};
export default Chart;
