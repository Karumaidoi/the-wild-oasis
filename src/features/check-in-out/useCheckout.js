import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data?.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error(`There was an error when checking in`);
    },
  });

  return { checkout, isCheckingOut };
}
