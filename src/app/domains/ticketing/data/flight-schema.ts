import { apply, applyEach, applyWhenValue, min, required, schema, validateStandardSchema } from "@angular/forms/signals";

import { Flight } from "./flight";
import { FlightZodSchema } from "./flight-zod-schema";
import { validateCityAsync, validateRoundTrip } from "./flight-validators";
import { aircraftSchema } from "./aircraft-schema";
import { priceSchema } from "./price.schema";

export const flightSchema = schema<Flight>(path => {
  // validateStandardSchema(path, FlightZodSchema);
  // required(path.from);
  // required(path.to);
  // required(path.date);
  // applyWhenValue(path, (path) => path.delayed, delayedFlightSchema);
  // validateRoundTrip(path);
  // validateCityAsync(path.from);
  // apply(path.aircraft,aircraftSchema);
  applyEach(path.prices, priceSchema);
})

export const delayedFlightSchema = schema<Flight>((path) => {
  required(path.delay);
  min(path.delay, 15);
});
