/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isLoading, booking } = useBooking();

  console.log(booking);

  const moveBack = useMoveBack();
  const [hasPaid, setHasPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isCheckingin } = useCheckin();
  const {
    settings,
    isLoading: loadingSettings,
    error: settingsError,
  } = useSettings();

  console.log(settings);

  useEffect(() => {
    setHasPaid(booking?.hasPaid ?? false);
  }, [booking?.hasPaid]);

  const {
    id: bookingId,
    Guest: guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  console.log(optionalBreakfastPrice);

  function handleCheckin() {
    if (!hasPaid) return;

    checkin(bookingId);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add), setHasPaid(false);
          }}
        >
          Want to pay breakfast for ${optionalBreakfastPrice}?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={hasPaid}
          onChange={() => setHasPaid((confirm) => !confirm)}
          disabled={hasPaid === true || isCheckingin}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid a total price of
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          disabled={hasPaid != true || isCheckingin}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
