import { Service } from '@angular/core';

/*
  La inyección de dependencias permite
  intercambiar servicios en función de una configuración.

  Esto resulta útil para realizar pruebas; por ejemplo,
  es posible sustituir los servicios de acceso a datos
  por servicios simulados (*mocks*) que emulan llamadas a la red.

  Otro caso de uso consiste en adaptar la aplicación a distintos clientes
  o configuraciones mediante el suministro de diferentes implementaciones.
*/

export abstract class LanguageService {
  abstract getUserLang(): string;
}

/*
  @Service({ autoProvided: false })

  Las hace disponibles para la inyección de dependencias,
  pero omite su registro automático en el inyector raíz.
*/

@Service({
  autoProvided: false,
})
export class DefuaultLanguageService implements LanguageService {
  getUserLang(): string {
    return 'es (default)';
  }
}

@Service({
  autoProvided: false,
})
export class BrowserLanguageService implements LanguageService {
  getUserLang(): string {
    return navigator.language + ' (browser)';
  }
}
