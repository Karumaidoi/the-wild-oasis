import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["currUser"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isLoading };
}
