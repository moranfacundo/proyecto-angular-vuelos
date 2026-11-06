import { rxResource } from '@angular/core/rxjs-interop';
import { SchemaPathTree, validate, validateAsync } from '@angular/forms/signals';
import { Flight } from './flight';
import { delay, map, Observable, of } from 'rxjs';

/**
 * Validar el ida y vuelta. Si el from es igual al to.
 * @param path
 */
export function validateRoundTrip(path: SchemaPathTree<Flight>) {
  validate(path, (ctx) => {
    const from = ctx.fieldTree.from().value();
    const to = ctx.fieldTree.to().value();

    // Alternative:
    // const from = ctx.valueOf(path.from);
    // const to = ctx.valueOf(path.to);

    if (from === to) {
      return {
        kind: 'roundtrip',
        from,
        to,
      };
    }

    return null;
  });
}

/**
 *  Validar si un aeropuerto con la funcion validateAsync
 *
 * mapea el form-state a params
 * crea un recurso con los params
 * onsuccess mapea el resultado del recurso a ValidationError o ValidationError[]
 * onerror mapea un posible error del recurso a ValidationError o ValidationError[]
 * @param path
 */
export function validateCityAsync(path: SchemaPathTree<string>) {
  validateAsync(path, {
    params: (ctx) => ({
      value: ctx.value(),
    }),
    factory: (params) => {
      return rxResource({
        params,
        stream: (p) => {
          return rxValidateAirport(p.params.value);
        },
      });
    },
    onSuccess: (result: boolean, ctx) => {
      if (!result) {
        return {
          kind: 'airport_not_found_http',
        };
      }
      return null;
    },
    onError: (error, _ctx) => {
      console.error('api error validating city', error);
      return {
        kind: 'api-failed',
      };
    },
  });
}

// Simulates a server-side validation
function rxValidateAirport(airport: string): Observable<boolean> {
  const allowed = ['Graz', 'Hamburg', 'Zürich'];
  return of(null).pipe(
    delay(2000),
    map(() => allowed.includes(airport)),
  );
}
