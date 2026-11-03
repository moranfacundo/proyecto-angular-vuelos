import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-about',
  templateUrl: './about.html',
})
export class About {
  // Cambiar ruta programaticamente
  private readonly router = inject(Router);

  protected navegarHaciaFlightSearch() {
    /*
      El método `navigate` recibe la ruta deseada como un array.
      Cada elemento del array corresponde a un segmento de URL.
      Estos se codifican en formato URL y se concatenan.
      La ruta resultante se utiliza para identificar la ruta de destino.
    */
    this.router.navigate(['/flight-search'], {
      queryParams: {
        expertMode: true
      }
    });
  }
}
