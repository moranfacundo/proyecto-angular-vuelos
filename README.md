# Sistema de vuelos en Angular

### Paquetes instalados

```bash
- npm install @ngrx/signals
- ng add @angular/material
```

### Schematis config

```json
"schematics": {
"@schematics/angular:component": {
"style": "none",
"skipTests": true,
"changeDetection": "OnPush"
},
"@schematics/angular:directive": {
"skipTests": true
},
"@schematics/angular:pipe": {
"skipTests": true
},
"@schematics/angular:service": {
"skipTests": true
}
},
```

### Linter iniciado

```bash
ng lint
```


### CLI commands
```bash
ng g c domains/ticketing/feature-booking/flight-search
ng g c domains/ticketing/ui/flight-card
ng g i domains/ticketing/data/flight
ng g i domains/ticketing/data/aircraft
ng g i domains/ticketing/data/price
```

### Router components
```bash
ng g c domains/ticketing/feature-booking/passenger-search
ng g c shell/home
ng g c shell/about
ng g c domains/ticketing/feature-booking/flight-edit
# La opción --flat indica que no se debe generar ninguna carpeta adicional.
ng g c domains/ticketing/feature-booking/booking-navigation --flat
```

### Services
```bash
ng g s domains/ticketing/data/flight-client
ng g s domains/shared/util-common/config-service
ng g s domains/shared/util-common/language
ng g s domains/ticketing/feature-booking/flight-search/flight-store
```

### Forms
```bash
ng g c domains/shared/ui-forms/validation-errors/validation-errors-pane
```

### Vitest
```bash
# Para instalar e inicializar Playwright, ejecuta el siguiente comando en tu proyecto Angular:
ng add @vitest/browser-playwright
npx playwright install
```
Para indicarle a Angular CLI que utilice el modo navegador, debes ajustar la configuración de pruebas de tu proyecto en el archivo `angular.json`.
Para ello, busca el nodo `projects/<nombre-del-proyecto>/architect/test` y define uno o más navegadores que se utilizarán (Listado 7-4).
```json
"test": {
"builder": "@angular/build:unit-test",
"options": {
"browsers": ["Chromium"]
},
"configurations": {
"ci": {
"watch": false,
"browsers": ["ChromiumHeadless"]
}
}
},
```
