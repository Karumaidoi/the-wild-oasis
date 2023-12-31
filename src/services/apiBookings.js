/* eslint-disable no-unused-vars */
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Cabins(*), Guest(*)")
    .eq("id", id);

  if (error) {
    throw new Error("Booking not found");
  }

  return data.at(0);
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("Bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, Cabins(name), Guest(fullName, email)",
      { count: "exact" }
    );

  // Filter
  if (filter.value) query = query.eq(filter.field, filter.value);

  // SORTING
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not found");
  }

  return { data, count };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, Guest(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday({ end: true }));

  if (error) {
    console.error(error.message);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Guest(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, breakfast) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(breakfast)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
