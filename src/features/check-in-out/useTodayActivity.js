import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodaysActivity() {
  const { data: todaysActivity, isLoading } = useQuery({
    queryKey: ["todays"],
    queryFn: getStaysTodayActivity,
  });

  return { todaysActivity, isLoading };
}
