import axios from "axios";
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
    onSuccess: (res: { token: string }) => {
      localStorage.setItem("token", res.token);
      toast.success("Welcome Back!");
      navigate("/");
    },
    onError: (res: { message: string }) => {
      toast.error(res.message || "There was an error");
    },
  });
  return mutation;
}
