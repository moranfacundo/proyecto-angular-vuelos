import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Flight } from '../../data/flight';
import { DatePipe } from '@angular/common';

@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-flight-card',
  templateUrl: './flight-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCard {
  readonly item = input.required<Flight>();
  readonly selected = input(false);
  readonly selectedChange = output<boolean>();

  protected select(): void {
    this.selectedChange.emit(true);
  }

  protected deselect(): void {
    this.selectedChange.emit(false);
  }
}
