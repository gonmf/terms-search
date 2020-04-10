import { Chart } from "react-charts"

export default function TrendChart(props) {
  const trendData = props.trendData.map(datum => [new Date(parseInt(datum.time) * 1000), datum.value[0]])

  const data = React.useMemo(
    () => [
      {
        data: trendData
      }
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <div style={{ width: "600px", height: "200px" }}>
      <Chart data={data} axes={axes} />
    </div>
  );
}
