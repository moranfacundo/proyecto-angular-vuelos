import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal, numberAttribute, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { normalizeFlight, SimpleFlightDetailStore } from './simple-flight-detail-store';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { flightSchema } from '../../data/flight-schema';
import { ValidationErrorsPane } from '../../../shared/ui-forms/validation-errors/validation-errors-pane.ts/validation-errors-pane';

@Component({
  imports: [
    // la directiva que bindea el signal form al template (input, selects, textareas)
    FormField,
    // la directiva que conecta el form html con el signal form
    FormRoot,
    JsonPipe,
    // componente para render de errores de validacion
    ValidationErrorsPane
  ],
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // STORE
  protected readonly store = inject(SimpleFlightDetailStore);
  protected readonly flight = linkedSignal(() => normalizeFlight(this.store.flight()));

  // SIGNAL FORM
  // con el schema y sus reglas de validacion (required y minlenght)
  // el form es de tipo FieldTree, se asemeja a una signal profundamente anidada
  // por cada propiedad del form se representa como una signal
  // si tomamos la propiedad date, podemos ver date().value(), date().dirty(), date().invalid(), date().errors()
  protected readonly flightForm = form(this.flight, flightSchema);

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
