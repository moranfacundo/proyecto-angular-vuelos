import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MinValidationError, ValidationError } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-validation-errors-pane',
  templateUrl: './validation-errors-pane.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorsPane {
  readonly errors = input.required<ValidationError.WithFieldTree[]>();
  readonly showFieldNames = input(false);

  protected readonly errorMessages = computed(() => this.toErrorMessages(this.errors(), this.showFieldNames()));

  protected toErrorMessages(
    errors: ValidationError.WithFieldTree[],
    showFieldNames: boolean
  ): string[] {
    return errors.map( (error) => {
        const prefix = showFieldNames ? toFieldName(error) + ': ' : ''

        const message = error.message ?? toMessage(error)

        return prefix + message
    })
  }
}

function toFieldName(error: ValidationError.WithField) {
  return error.fieldTree().name().split('.').at(-1);
}

function toMessage(error: ValidationError): string {
  switch (error.kind) {
    case 'required':
      return 'Enter a value!';
    case 'roundtrip':
    case 'roundtrip_tree':
      return 'Roundtrips are not supported!';
    case 'min':
      return `Minimum amount: ${(error as MinValidationError).min}`;
    default:
      return error.kind ?? 'Validation Error';
  }
}
