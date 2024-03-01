import { ScatterChart } from "@mui/x-charts";

const data = [
  { x: 80, y: 200, id: 1 },
  { x: 120, y: 100, id: 2 },
  { x: 170, y: 300, id: 3 },
  { x: 140, y: 250, id: 4 },
  { x: 150, y: 300, id: 5 },
  { x: 110, y: 280, id: 6 },
];
const Graph3 = () => {
  return (
    <ScatterChart
      width={300}
      height={250}
      series={[{ data, label: "GPT-4", id: "pvId" }]}
      xAxis={[{ min: 0 }]}
    />
  );
};

export default Graph3;
