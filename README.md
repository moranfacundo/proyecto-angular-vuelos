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
