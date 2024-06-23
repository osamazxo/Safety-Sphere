import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export type DeviceType = {
  _id: string;
  secret: string;
  createdAt: string;
  updatedAt: string;
  gas?: number;
  humidity?: number;
  lastSeen: string;
  location: string;
  temperature?: number;
  vibration?: number;
  user?: {
    _id: string;
    userName: string;
  };
};

export function useGetDevices() {
  const query = useQuery<DeviceType[]>({
    queryKey: ["devices"],
    queryFn: async () => {
      const res = await axios.get("devices");
      return res.data.devices;
    },
  });
  return query;
}

export function useAddDevice(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.post<DeviceType>("devices", data);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Device was added successfully");
      queryClient.setQueryData<DeviceType[]>("devices", (old) => {
        if (old) return [...old, res];
        else return [res];
      });
      onSuccess && onSuccess();
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data?.message || "There was an error adding this device"
      );
      onError && onError();
    },
  });
  return mutation;
}

export function useEditDevice(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: {
      deviceId: string;
      secret?: string;
      password?: string;
    }) => {
      const { deviceId, ...other } = data;
      const res = await axios.patch<DeviceType>("devices/" + deviceId, other);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Device was updated successfully");
      if (variables.secret) {
        const secret = variables.secret;
        queryClient.setQueryData<DeviceType[]>("devices", (old) => {
          if (old)
            return old.map((device) =>
              device._id === variables.deviceId ? { ...device, secret } : device
            );
          else return [];
        });
      }
      onSuccess && onSuccess();
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data?.message || "There was an error updating this device"
      );
      onError && onError();
    },
  });
  return mutation;
}

export function useDeleteDevice(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { deviceId: string }) => {
      const res = await axios.delete<DeviceType>("devices/" + data.deviceId);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Device was deleted successfully");
      queryClient.setQueryData<DeviceType[]>("devices", (old) => {
        if (old) return old.filter((ele) => ele._id !== variables.deviceId);
        else return [];
      });
      onSuccess && onSuccess();
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data?.message || "There was an error updating this device"
      );
      onError && onError();
    },
  });
  return mutation;
}
