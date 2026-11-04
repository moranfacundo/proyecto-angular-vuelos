import { computed, inject, Service, signal } from '@angular/core';
import { FlightClient } from '../../data/flight-client';
import { toFlightsWithDelays } from './to-flight-with-delay';

@Service()
export class FlightStore {
  private readonly flightClient = inject(FlightClient);

  // From
  private readonly _from = signal('Graz');
  readonly from = this._from.asReadonly();

  // To
  private readonly _to = signal('Hamburg');
  readonly to = this._to.asReadonly();

  // Basket
  private readonly _basket = signal<Record<number, boolean>>({});
  readonly basket = this._basket.asReadonly();

  // Delay
  private readonly _delay = signal(0);
  readonly delayInMin = this._delay.asReadonly();

  // FlightResource
  private readonly flightsResource = this.flightClient.buscarVuelosResource(this.from, this.to);

  readonly flights = this.flightsResource.value;
  readonly flightsIsLoading = this.flightsResource.isLoading;
  readonly flightsError = this.flightsResource.error;

  readonly flightsIsLoaded = computed(() => this.flightsResource.status() === 'resolved');

  // FlightsWithDelays
  readonly flightsWithDelays = computed(() =>
    toFlightsWithDelays(this.flights(), this.delayInMin()),
  );

  updateFilter(from: string, to: string): void {
    this._from.set(from);
    this._to.set(to);
  }

  updateFrom(from: string): void {
    this._from.set(from);
  }

  updateTo(to: string): void {
    this._to.set(to);
  }

  updateBasket(flightId: number, selected: boolean): void {
    this._basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }

  reload(): void {
    this.flightsResource.reload();
  }

  delay(): void {
    this._delay.update((delay) => delay + 15);
  }
}
