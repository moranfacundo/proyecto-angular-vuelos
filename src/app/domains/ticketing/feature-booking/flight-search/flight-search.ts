import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { form, FormField , debounce} from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { DatePipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FlightCard } from '../../ui/flight-card/flight-card';
import { FlightStore } from './flight-store';


@Component({
  imports: [FormField, DatePipe, JsonPipe, FlightCard, RouterLink],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  /* Injected HTTP Client */
  private readonly http = inject(HttpClient);
  private readonly store = inject(FlightStore);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    this.showError();
  }

  protected readonly filter = linkedSignal(
    () => ({
      from: this.store.from(),
      to: this.store.to(),
    }),
    {
      set: (value) => this.store.updateFilter(value.from, value.to),
    },
  );

  protected readonly filterForm = form(this.filter, (path) => {
    debounce(path.from, 300)
    debounce(path.to, 300)
  });

  protected readonly flights = this.store.flightsWithDelays;
  protected readonly isLoading = this.store.flightsIsLoading;
  protected readonly error = this.store.flightsError;

  protected readonly basket = this.store.basket;

  protected readonly flightRoute = computed(() => this.filter().from + ' - ' + this.filter().to);

  /* Metodos */

  // protected search(): void {
  //   this.store.updateFilter(this.filter().from, this.filter().to);
  //   this.store.reload();
  // }

  protected updateBasket(flightId: number, selected: boolean): void {
    this.store.updateBasket(flightId, selected);
  }

  protected delay(): void {
    this.store.delay();
  }

  private showError() {
    effect(() => {
      const error = this.error();
      // checking for the string error is just for demonstration purposes.
      if (error || this.filter().to === 'error') {
        const message = 'Error loading flights: ' + error;
        this.snackBar.open(message, 'OK');
      }
    });
  }

  // protected searchWithHTTPClient(): void {
  //   const flightsURL = 'https://demo.angulararchitects.io/api/flight';

  //   const filter = this.filter();

  //   const params = {
  //     from: filter.from,
  //     to: filter.to,
  //   };

  //   this.http.get<Flight[]>(flightsURL, { params }).subscribe({
  //     next: (flights) => {
  //       this.flights.set(flights);
  //     },
  //     error: (err) => {
  //       console.error('Error en searchWithHTTPClient', err);
  //     },
  //   });
  // }
}
