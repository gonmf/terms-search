import { Chart } from "react-charts"

export default function TrendChart({ trendData }) {
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
      { primary: true, type: "utc", position: "bottom" },
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
