/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDelete } from "./useDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { isLoading, deleteBook } = useDelete();
  const { isCheckingOut, checkout } = useCheckout();

  const statusToTagName = {
    Unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{booking?.Cabins.name}</Cabin>

      <Stacked>
        <span>{booking?.Guest.name}</span>
        <span>{booking?.Guest.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking?.startDate))
            ? "Today"
            : formatDistanceFromNow(booking?.startDate)}{" "}
          &rarr; {booking?.numNights} night stay
        </span>
        <span>
          {format(new Date(booking?.startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking?.endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[booking?.status]}>
        {booking?.status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(booking?.totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toogle id={booking?.id} />
        <Menus.List id={booking?.id}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${booking?.id}`)}
          >
            See Details
          </Menus.Button>
          {booking?.status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${booking?.id}`)}
            >
              Check In
            </Menus.Button>
          )}
          {booking?.status === "checked-in" && (
            <Menus.Button
              disabled={isCheckingOut}
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(booking?.id)}
            >
              Check Out
            </Menus.Button>
          )}
          <Menus.Button
            disabled={isCheckingOut}
            icon={<HiArrowUpOnSquare />}
            onClick={() => deleteBook(booking?.id)}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
