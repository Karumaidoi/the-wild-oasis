import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { data: bookings, isLoading: loadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: loadingStays, numDays } = useRecentStays();
  const { cabins, isLoading: loadingCabins } = useCabins();

  if (loadingBookings || loadingStays || loadingCabins) return <Spinner />;

  if (!loadingBookings && !loadingStays) {
    console.log(confirmedStays);
    console.log(bookings);
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Todays Activities</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
