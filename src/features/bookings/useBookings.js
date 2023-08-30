import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, data, error };
}
