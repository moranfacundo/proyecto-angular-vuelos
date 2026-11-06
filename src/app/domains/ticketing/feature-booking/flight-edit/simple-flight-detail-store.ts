import { inject, Service, Signal, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, firstValueFrom, tap, throwError } from 'rxjs';

import { Flight, initialFlight } from '../../data/flight';
import { FlightClient, initializeFlight } from '../../data/flight-client';
import { httpResource } from '@angular/common/http';
import { ConfigService } from '../../../shared/util-common/config-service';

@Service()
export class SimpleFlightDetailStore {
  private flightClient = inject(FlightClient);
  private snackBar = inject(MatSnackBar);
  private readonly config = inject(ConfigService);

  // FlightId Filter
  private readonly _flightId = signal<number>(0);
  readonly flightId = this._flightId.asReadonly();

  // Pending state
  private readonly _isPending = signal(false);
  readonly isPending = this._isPending.asReadonly();

  // FlightResource
  private readonly flightResource = this.flightClient.findResourceById(this.flightId);
  readonly flight = this.flightResource.value;
  readonly isLoading = this.flightResource.isLoading;
  readonly error = this.flightResource.error;

  setFlightId(id: number): void {
    this._flightId.set(id);
  }

  saveFlight(flight: Flight): Promise<Flight> {
    this._isPending.set(true);

    return firstValueFrom(
      this.flightClient.update(flight).pipe(
        tap((updatedFlight) => {
          this.flightResource.set(updatedFlight);
          this.snackBar.open('Flight updated successfully', 'OK', {
            duration: 3000,
          });
        }),
        catchError((err) => {
          const message = 'Failed to update flight';
          console.error(message, err);
          this.snackBar.open(message, 'OK', {
            duration: 5000,
          });
          return throwError(() => err);
        }),
        finalize(() => {
          this._isPending.set(false);
        }),
      ),
    );
  }

  reload(): void {
    this.flightResource.reload();
  }

  findResourceById(id: Signal<number>) {
    return httpResource<Flight>(
      () => ({
        url: `${this.config.baseURL}/flight`,
        headers: {
          Accept: 'application/json',
        },
        params: {
          id: id(),
        },
      }),
      // TODO: Extend Service
      {
        defaultValue: initialFlight,
        parse: (raw) => {
          return initializeFlight(raw);
        },
      },
    );
  }
}

export function normalizeFlight(flight: Flight): Flight {
  const localDate = flight.date.substring(0, 16);
  return {
    ...flight,
    date: localDate,
  };
}
