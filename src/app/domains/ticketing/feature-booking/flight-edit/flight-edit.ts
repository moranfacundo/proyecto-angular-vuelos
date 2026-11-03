import { booleanAttribute, Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
})
export class FlightEdit {
  // PARAMETROS CON withComponentInputBinding
  protected readonly id = input.required({
    /*
      Dado que los parámetros de enrutamiento son siempre cadenas
      de texto, debemos convertirlos a los tipos deseados.
      Para ello, pasamos los transformadores integrados
      `numberAttribute` y `booleanAttribute`
      a `input` e `input.required`.
    */
    transform: numberAttribute,
  });

  protected readonly showDetails = input.required({
    transform: booleanAttribute,
  });

  constructor() {
    effect(() => {
      console.log('id', this.id());
      console.log('showDetails', this.showDetails());
    });
  }

  /*
  //  PARAMETROS CON ACTIVATED ROUTE

  private readonly activatedRoute = inject(ActivatedRoute)

  private readonly id = signal(0)
  private readonly showDetails = signal(false)

  constructor() {
    this.activatedRoute.paramMap.subscribe(paramsMap => {
      const flightId = parseInt(paramsMap.get('id') ?? '0')

      this.id.set(flightId)

      const showDetails = (paramsMap.get('showDetails') === 'true')

      this.showDetails.set(showDetails)
    })
  }
  */
}
