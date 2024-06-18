import AreaChart from "@ui/AreaChart";

const ActiveDevicesChart = () => {
  return (
    <AreaChart
      label="Active Devices"
      name="active devices"
      categories={["sun", "mon", "tue"]}
      data={[5, 7, 2]}
      height="260px"
    />
  );
};

export default ActiveDevicesChart;
