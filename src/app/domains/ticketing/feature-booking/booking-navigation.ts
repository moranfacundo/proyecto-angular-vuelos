import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    RouterOutlet
  ],
  selector: 'app-booking-navigation',
  templateUrl: './booking-navigation.html',
})
export class BookingNavigation {}
