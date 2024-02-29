import { PieChart } from "@mui/x-charts";

const Graph4 = () => {
  const data = [
    { label: "Group A", value: 400 },
    { label: "Group B", value: 300 },
    { label: "Group C", value: 300 },
    { label: "Group D", value: 200 },
  ];

  return (
    <div>
      <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            data,
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default Graph4;
