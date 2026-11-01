import { Component, signal } from '@angular/core';

import { Navbar } from './shell/navbar/navbar';
import { Sidebar } from './shell/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Proyecto Vuelos');
}
