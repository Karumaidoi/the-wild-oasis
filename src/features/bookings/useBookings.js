import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Get filtered value
  const filteredValue = searchParams.get("status");
  console.log(filteredValue);

  const filter =
    !filteredValue || filteredValue === "all"
      ? { field: "status", value: null }
      : { field: "status", value: filteredValue };

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, data, error };
}
