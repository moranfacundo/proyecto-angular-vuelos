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
