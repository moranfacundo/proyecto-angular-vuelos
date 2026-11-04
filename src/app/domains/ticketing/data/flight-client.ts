import { httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight } from './flight';
import { ConfigService } from '../../shared/util-common/config-service';

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

  private readonly config = inject(ConfigService)

  buscarVuelosResource(from: Signal<string>, to: Signal<string>) {
    return httpResource<Flight[]>(
      () => {
        if (!from() || !to())
          return undefined

        return {
          url: `${this.config.baseURL}/flight`,
          headers: {
            Accept: 'application/json'
          },
          params: {
            from: from(),
            to: to()
          }
        }
      },
      {
        defaultValue: []
      }
    )
  }
}
