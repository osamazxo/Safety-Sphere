import axios from "axios";
import { useQuery } from "react-query";
import { AlertType } from "./dashboard";

export type MonthlyStatics = {
  date: string;
  alerts?: AlertType[];
  series?: {
    minimum: number;
    maximum: number;
    sum: number;
    count: number;
    alerts: AlertType[];
  };
}[];
export function useGetUserAnalytics(
  sensor: "temperature" | "gas" | "humidity" | "vibration"
) {
  const query = useQuery({
    queryKey: ["user-analytics", sensor],
    queryFn: async () => {
      const res = await axios.get<{ monthlyStatics: MonthlyStatics }>(
        "analytics?sensor=" + sensor
      );
      return res.data.monthlyStatics;
    },
  });
  return query;
}
