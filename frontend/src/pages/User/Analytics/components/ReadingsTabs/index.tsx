import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TemperatueTab from "./TemperatueTab";
import HumidityTab from "./HumidityTab";
import GasTab from "./GasTab";
import VibrationTab from "./VibrationTab";

const tabs = ["temperature", "humidity", "gas", "vibration"];
const tabsComponents = {
  temperature: <TemperatueTab />,
  humidity: <HumidityTab />,
  gas: <GasTab />,
  vibration: <VibrationTab />,
};
const ReadingTabs = () => {
  const [currentTab, setCurrentTab] = useState<
    "temperature" | "humidity" | "gas" | "vibration"
  >("temperature");

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
      {tabsComponents[currentTab]}
    </>
  );
};

export default ReadingTabs;
