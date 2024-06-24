import { FC } from "react";
import Item from "./Item";

import { ReadingType } from "@api/dashboard";

const LastReading: FC<{ reading?: ReadingType }> = ({ reading }) => {
  return (
    <>
      <Item
        item={{
          title: "Temperature",
          value: reading?.temperature !== undefined ? reading.temperature : "-",
          symbol: "°C",
          date: reading?.time || "",
        }}
      />
      <Item
        item={{
          title: "Humidity",
          value: reading?.humidity !== undefined ? reading.humidity : "-",
          symbol: "%",
          date: reading?.time || "",
        }}
      />
      <Item
        item={{
          title: "Gas",
          value: reading?.gas !== undefined ? reading.gas : "-",
          date: reading?.time || "",
        }}
      />
      <Item
        item={{
          title: "Vibration",
          value: reading?.vibration !== undefined ? reading.vibration : "-",
          date: reading?.time || "",
        }}
      />
    </>
  );
};

export default LastReading;
