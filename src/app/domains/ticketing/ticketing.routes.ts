import { Routes } from "@angular/router";

import { BookingNavigation } from "./feature-booking/booking-navigation";
import { FlightSearch } from "./feature-booking/flight-search/flight-search";
import { FlightEdit } from "./feature-booking/flight-edit/flight-edit";
import { PassengerSearch } from "./feature-booking/passenger-search/passenger-search";

const ticketingRoutes: Routes = [
  {
    path: 'booking',
    component: BookingNavigation,
    /*
      Las rutas para gestionar los vuelos y los pasajeros
      se incluyen en los elementos hijos del nodo.
      Esto permite al enrutador activar dichos componentes
      hijos dentro del marcador de posición.
    */
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full',
      },
      {
        path: 'flight-search',
        component: FlightSearch,
      },
      //RUTA PARAMETRIZADA
      /*
        Es necesario incluir marcadores de posición para aquellos parámetros
        que ocupan sus propios segmentos de URL dentro.
        Estos marcadores de posición deben ir precedidos por dos puntos.

        Angular reconoce los parámetros con nombre en tiempo de ejecución
        sin necesidad de ninguna acción adicional.
        No es preciso incluir los parámetros de matriz ni los parámetros
        de consulta en la configuración.
      */
      {
        path: 'flight-edit/:id',
        component: FlightEdit,
      },
      {
        path: 'passenger-search',
        component: PassengerSearch,
      },
    ],
  },
];

export default ticketingRoutes;
