import {
HttpTestingController,
provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from "@angular/router";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { page } from 'vitest/browser';

import { FlightSearch } from "./flight-search";

describe('flight-search', () => {
  let component: FlightSearch;
  let fixture: ComponentFixture<FlightSearch>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        FlightSearch
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FlightSearch);
    component = fixture.componentInstance
  })


  // afterEach( () => {
  //   ctrl.verify();
  // })

  it('can be created', () => {
    expect(component).not.toBeUndefined()
  })

  /*
    Una forma cómoda de interactuar con el DOM en el modo navegador de Vitest
    es mediante el objeto «página» (page object) que proporciona Vitest.

    Por ejemplo, el siguiente caso de prueba vacía los campos «Desde» (From) y «Hasta» (To)
    y comprueba si el botón de búsqueda está deshabilitado.
  */

  it('desabilita el boton search cuando from o to estan vacios', async () => {
    await page.getByLabelText('From').fill('');
    await page.getByLabelText('To').fill('');

    const button = page.getByRole('button', { name: 'Search' });
    await expect.element(button).toBeDisabled();
  })
})
