import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { AlertType } from "./dashboard";
import toast from "react-hot-toast";
import { checkErrorStatus } from "@util/checkErrorStatus";

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
    staleTime: 60000 * 3,
    refetchInterval: 60000 * 3,
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
    },
  });
  return query;
}
