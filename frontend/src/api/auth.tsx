import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export function useSignin() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: { userName: string; password: string }) => {
      const res = await axios.post("auth/signin", data);
      return res.data;
    },
    onSuccess: (res: { token: string; role: string }) => {
      localStorage.setItem("token", res.token);
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
