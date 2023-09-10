import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: logInFn, isLoading: isLoadingAuth } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Provided email and password are incorect");
    },
  });

  return { isLoadingAuth, logInFn };
}
