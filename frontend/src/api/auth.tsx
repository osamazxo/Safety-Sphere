import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

type AccountType = {
  userName?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  preferences?: {
    temperatureRange: {
      active: boolean;
      min: number;
      max: number;
    };
    humidityRange: {
      active: boolean;
      min: number;
      max: number;
    };
    emailGas: boolean;
    emailVibration: boolean;
  };
};

export function useSignin() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.post("auth/signin", data);
      return res.data;
    },
    onSuccess: (res: { token: string; role: string }) => {
      localStorage.setItem("token", res.token);
      axios.defaults.headers.common["token"] = res.token;
      localStorage.setItem("role", res.role);
      toast.success("Welcome Back!");
      navigate("/");
    },
    onError: (
      res: AxiosError<{
        message: string;
      }>
    ) => {
      toast.error(res?.response?.data.message || "There was an error");
    },
  });
  return mutation;
}

export function useGetAccount() {
  const query = useQuery<AccountType>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const res = await axios.get("auth/user");
      return res.data.user;
    },
  });
  return query;
}

export function useUpdateAccount(onSuccess?: () => void, onError?: () => void) {
  const mutation = useMutation({
    mutationFn: async (data: AccountType) => {
      const res = await axios.patch("auth/user", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Your account was updated successfully");
      onSuccess && onSuccess();
    },
    onError: (res: Error) => {
      toast.error(res.message);
      onError && onError();
    },
  });
  return mutation;
}

// admin routes
export function useAddAdmin(onSuccess?: () => void, onError?: () => void) {
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.post("auth/admin", data);
      return res;
    },
    onSuccess: (_, variables) => {
      toast.success(variables.userName + " was added successfully");
      onSuccess && onSuccess();
    },
    onError: async (err: Error) => {
      toast.error(err.message);
      onError && onError();
    },
  });
  return mutation;
}

export function useDeleteAdmin(onSuccess?: () => void, onError?: () => void) {
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.delete("auth/admin", { data });
      return res;
    },
    onSuccess: (_, variables) => {
      toast.success(variables.userName + " was deleted successfully");
      onSuccess && onSuccess();
    },
    onError: async (err: Error) => {
      toast.error(err.message);
      onError && onError();
    },
  });
  return mutation;
}
