import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success("Please verify account from users email address");
    },
  });

  return { signUp, isLoading };
}
