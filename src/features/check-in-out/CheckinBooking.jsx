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
  const { isLoading, booking, error } = useBooking();

  const moveBack = useMoveBack();
  const [hasPaid, setHasPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isCheckingin } = useCheckin();

  const {
    settings,
    isLoading: loadingSettings,
    error: settingsError,
  } = useSettings();

  useEffect(() => {
    setHasPaid(booking?.hasPaid ?? false);
  }, [booking?.hasPaid]);

  const optionalBreakfastPrice =
    settings?.breakfastPrice * booking?.numNights * booking?.numGuests;

  function handleCheckin() {
    if (!hasPaid) return;

    if (!addBreakfast) {
      console.log(booking);
      const id = booking?.id;
      console.log(id);
      const totalPrice = booking?.totalPrice;
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      console.log(booking);
      const id = booking?.id;
      checkin({ id, breakfast: {} });
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
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
          I confirm that {booking?.Guest?.fullName} has paid a total price of
          {formatCurrency(booking?.totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          disabled={hasPaid != true || isCheckingin}
          onClick={handleCheckin}
        >
          Check in booking #{booking?.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
