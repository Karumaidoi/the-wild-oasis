import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        hasPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`There was an error when checking out`);
    },
  });

  return { checkin, isCheckingin };
}
