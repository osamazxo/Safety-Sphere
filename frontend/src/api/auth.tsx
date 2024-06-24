import { checkErrorStatus } from "@util/checkErrorStatus";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
type UserType = {
  _id: string;
  userName: string;
  lastSeen: string;
  email: string;
};
export function useSignin(onSuccess?: () => void, onError?: () => void) {
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
      onSuccess && onSuccess();
      navigate("/");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return mutation;
}

export function useGetAccount(onSuccess?: () => void, onError?: () => void) {
  const query = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const res = await axios.get<{ user: AccountType }>("auth/user");
      return res.data.user;
    },
    onSuccess,
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
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
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return mutation;
}

// admin routes
export function useGetAdmins(onSuccess?: () => void, onError?: () => void) {
  const query = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await axios.get<{ admins: UserType[] }>("auth/admin");
      return res.data.admins;
    },
    onSuccess,
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return query;
}

export function useAddAdmin(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.post("auth/admin", data);
      return res.data;
    },
    onSuccess: (res, variables) => {
      console.log(res);
      toast.success(variables.userName + " was added successfully");
      queryClient.setQueryData<UserType[]>("admins", (old) => {
        if (old) return [...old, res];
        else return [res];
      });
      onSuccess && onSuccess();
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return mutation;
}

export function useDeleteAdmin(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { userName: string }) => {
      const res = await axios.delete("auth/admin", { data });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(variables.userName + " was deleted successfully");
      queryClient.setQueryData<UserType[]>("admins", (old) => {
        return old?.filter((ele) => ele.userName != variables.userName) || [];
      });
      onSuccess && onSuccess();
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message || "There was an error");
      checkErrorStatus(err);
      onError && onError();
    },
  });
  return mutation;
}
