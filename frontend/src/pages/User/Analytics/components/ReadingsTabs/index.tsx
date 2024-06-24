import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TemperatueTab from "./TemperatueTab";
import HumidityTab from "./HumidityTab";
import GasTab from "./GasTab";
import VibrationTab from "./VibrationTab";
import { MonthlyStatics, useGetUserAnalytics } from "@api/analytics";

const tabs = ["temperature", "humidity", "gas", "vibration"];
const getTab = (data?: MonthlyStatics) => ({
  temperature: <TemperatueTab data={data} />,
  humidity: <HumidityTab data={data} />,
  gas: <GasTab data={data} />,
  vibration: <VibrationTab data={data} />,
});
const ReadingTabs = () => {
  const [currentTab, setCurrentTab] = useState<
    "temperature" | "humidity" | "gas" | "vibration"
  >("temperature");
  const { data, isLoading, isError } = useGetUserAnalytics(currentTab);
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        aria-label="Reading Tabs"
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            value={tab}
            sx={{ textTransform: "capitalize" }}
          />
        ))}
      </Tabs>
      {isLoading ? "" : isError ? "" : getTab(data)[currentTab]}
    </>
  );
};

export default ReadingTabs;
