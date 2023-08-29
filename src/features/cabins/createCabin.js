import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreatCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isLoading };
}
