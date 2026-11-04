import { Flight } from "../../data/flight";

export function toFlightsWithDelays(flights: Flight[], delay: number): Flight[] {
  if (flights.length === 0) {
    return [];
  }
  const ONE_MINUTE = 1000 * 60;
  const oldFlights = flights;
  const oldFlight = oldFlights[0];
  const oldDate = new Date(oldFlight.date);
  const newDate = new Date(oldDate.getTime() + delay * ONE_MINUTE);
  const newFlight = { ...oldFlight, date: newDate.toISOString() };
  return [newFlight, ...flights.slice(1)];
}
