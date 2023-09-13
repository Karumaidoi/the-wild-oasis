/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Tag from "./../../ui/Tag";
import FlagCountry from "./../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ item }) {
  console.log(item);
  const { cabinId, status, Guest: currGuest, numNights } = item;
  const { fullName, countryFlag } = currGuest;
  console.log(fullName);
  console.log(Guest);
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <FlagCountry src={countryFlag} alt={"Flag"} />
      <Guest>{fullName}</Guest>
      <div>{numNights} Nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${cabinId}`}
        >
          Check In
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={cabinId} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
