/*
  La función `describe` configura un conjunto de pruebas y define un caso de prueba.

  En el ejemplo, hemos estructurado esto siguiendo el patrón AAA:
   la fase *Arrange* (preparación) prepara la ejecución de la prueba,
   la fase *Act* (acción) lleva a cabo la acción que se va a probar,
   y la fase *Assert* (verificación) comprueba si se ha obtenido el resultado deseado.

*/

// EL objeto a testear, una funcion suma
const suma = (n1: number, n2: number) => n1 + n2;

// El test suite
describe('suma', () => {
  // Antes de cada test case
  beforeEach(() => {
    console.log("Aqui tareas de preparacion");
  })

  // el primer test case
  it('correctamente suma 1 y 2', () =>{
    // Arrange
    const n1 = 1;
    const n2 = 2;

    // Act
    const r = suma(n1, n2);

    // Assert
    expect(r).toBe(3);
  })

  // segundo test case pero omitido con skip
  it.skip('correctamente suma 1 y 2', () =>{
    // Arrange
    const n1 = 1;
    const n2 = 2;

    // Act
    const r = suma(n1, n2);

    // Assert
    expect(r).toBe(3);
  })
})
