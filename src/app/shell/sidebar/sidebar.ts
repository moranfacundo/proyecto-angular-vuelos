import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  // DIRECTIVAS PARA HYPERLINKS (RUTAS)
  // ROUTERLINK ACTIVA LA RUTA
  // ROUTERLINKACTIVE RESALTA EL MENU ACTIVADO
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {}
