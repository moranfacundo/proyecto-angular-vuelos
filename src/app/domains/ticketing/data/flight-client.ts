import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight, initialFlight } from './flight';
import { ConfigService } from '../../shared/util-common/config-service';
import { initialAircraft } from './aircraft';
import { Observable } from 'rxjs';

/*
  @Service()

  Angular crea una única instancia de este servicio —lo que se denomina *singleton*—
  para toda la aplicación.

  Esta instancia puede ser utilizada por todos los componentes
  y otros servicios. Esta es la configuración predeterminada,
  adecuada para la mayoría de los casos.
*/
@Service()
export class FlightClient {
  /*
    Proporciona acceso a los datos de los vuelos.
    El componente FlightSearch utiliza este servicio
    en lugar de acceder directamente al backend.
  */

  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient)

  buscarVuelosResource(from: Signal<string>, to: Signal<string>) {
    return httpResource<Flight[]>(
      () => {
        if (!from() || !to()) return undefined;

        return {
          url: `${this.config.baseURL}/flight`,
          headers: {
            Accept: 'application/json',
          },
          params: {
            from: from(),
            to: to(),
          },
        };
      },
      {
        defaultValue: [],
      },
    );
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

  update(flight: Flight): Observable<Flight> {
    const url = `${this.config.baseURL}/flight/${flight.id}`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.put<Flight>(url, flight, { headers });
  }
}

export function initializeFlight(raw: unknown) {
  const flight = raw as Flight;
  flight.aircraft = initialAircraft;
  flight.prices = [];
  flight.delay = flight.delayed ? 15 : 0;
  return flight;
}
