import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField } from "@angular/forms/signals";
import { HttpClient, httpResource } from '@angular/common/http';
import { DatePipe, JsonPipe } from '@angular/common';

import { Flight } from '../../data/flight';
import { FlightCard } from '../../ui/flight-card/flight-card';

@Component({
  imports: [
    FormField,
    DatePipe,
    JsonPipe,
    FlightCard
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  /* Injected HTTP Client */
  private readonly http = inject(HttpClient);
  /*  HTTP Resource */
  protected readonly flightsResource = httpResource<Flight[]>(
    () => {
      const filter = this.filter();

      if (!filter.from || !filter.to) return undefined;

      return {
        url: 'https://demo.angulararchitects.io/api/flight',
        params: {
          from: this.filter().from,
          to: this.filter().to,
        },
      };
    },
    { defaultValue: [] },
  );

  protected readonly filter = signal({
    from: 'Hamburg',
    to: 'Graz',
  });

  protected readonly filterForm = form(this.filter);

  protected readonly flights = signal<Flight[]>([]);

  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  // Get resource result and status
  protected readonly flightsFromResource = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;

  /* Metodos */

  protected updateBasket(flightId: number, selected: boolean): void {
    this.basket.update(basket => ({
      ...basket,
      [flightId]: selected
    }))
  }

  protected searchWithHTTPClient(): void {
    const flightsURL = 'https://demo.angulararchitects.io/api/flight';

    const filter = this.filter();

    const params = {
      from: filter.from,
      to: filter.to,
    };

    this.http.get<Flight[]>(flightsURL, { params }).subscribe({
      next: (flights) => {
        this.flights.set(flights);
      },
      error: (err) => {
        console.error('Error en searchWithHTTPClient', err);
      },
    });
  }
}
