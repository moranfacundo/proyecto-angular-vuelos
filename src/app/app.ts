import { Component, signal } from '@angular/core';

import { Navbar } from './shell/navbar/navbar';
import { Sidebar } from './shell/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Proyecto Vuelos');
}
