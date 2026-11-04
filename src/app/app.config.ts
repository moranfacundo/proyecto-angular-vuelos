import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withAutoCleanupInjectors,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import {
  BrowserLanguageService,
  LanguageService,
} from './domains/shared/util-common/language-service';
import { provideLanguageService } from './domains/shared/util-common/language';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // REGISTRO DE CONFIGURACION DE RUTAS
    provideRouter(
      routes,
      /*
        Alternativa a `ActivatedRoute`. Una vez configurada, esta vincula
        los parámetros de la URL y los parámetros de matriz a las entradas (*inputs*)
        del componente que tengan el mismo nombre.
      */
      withComponentInputBinding(),
      //PRELOADING
      /*
        Cuando el enrutador (router) requiere dichas partes,
        estas ya se encuentran disponibles de inmediato.

        La estrategia `PreloadAllModules` viene incluida en Angular
        y precarga todas las rutas de carga diferida (*lazy routes*)
        tras el inicio de la aplicación.

        De este modo, la aplicación arranca inicialmente sin dichas rutas,
        lo que permite que se muestre con mayor rapidez.
      */
      withPreloading(PreloadAllModules),
      /*
        «limpieza automática» (*Auto Cleanup*).
        Esta funcionalidad destruye automáticamente los *Environment Providers*
         —así como las instancias de servicios que estos crean—
         cuando el usuario abandona la ruta correspondiente.
      */
      withAutoCleanupInjectors(),
    ),
    /*
      Aquí le indicamos a Angular que proporcione el `BrowserLanguageService`
      siempre que un componente u otro servicio solicite el tipo `LanguageService`.
    */
    // { provide: LanguageService, useClass: BrowserLanguageService },
    provideLanguageService('browser'),
  ],
};
