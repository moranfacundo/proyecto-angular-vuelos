import { Provider } from '@angular/core';

import {
  BrowserLanguageService,
  DefuaultLanguageService,
  LanguageService,
} from './language-service';


/*
  Funcion proveedora que encapsula detalles de configuración.

  Es habitual que este tipo de funciones se nombren utilizando el prefijo «provide».
  Devuelven un proveedor o un conjunto de proveedores.

  A menudo, también aceptan parámetros de configuración para adaptar
   los servicios suministrados a necesidades específicas.
*/

export type LanguageConfig = 'default' | 'browser';

export function provideLanguageService(config: LanguageConfig = 'default'): Provider[] {
  if (config === 'browser') {
    return [{ provide: LanguageService, useClass: BrowserLanguageService }];
  } else {
    return [{ provide: LanguageService, useClass: DefuaultLanguageService }];
  }
}
