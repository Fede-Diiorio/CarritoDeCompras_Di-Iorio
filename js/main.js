// VARIABLES
const nombre = "Federico";
const apellido = "Di Iorio";
let edad = 28;
const sexo = "Masculino";

// CAMBIANDO EL VALOR DE VARIABLES
edad = 29;

// OPERACIONES CON NÚMEROS 

const numero1 = 15;
const numero2 = 10;

const resultadoSuma = numero1 + numero2;
const resultadoResta = numero1 - numero2;
const resultadoMultiplicacion = numero1 * numero2;
const resultadoDivision = numero1 / numero2;

// OPERACIONES CON TEXTO
const nombreCompleto = nombre + " " + apellido;

// MOSTRAR CONCATENACION
console.log(nombreCompleto);

// PEDIRLE VALORES AL USUARIO
// const pregunta = prompt("Ingrese un nombre"); // La sententencia prompt siempre devuelve un string.
// console.log("El nombre de la persona es: " + pregunta);

// alert("El nombre de la persona es: " + pregunta);

const numero3 = prompt("Ingrese un número");
const numero4 = prompt("Ingrese otro número");

const sumaResultado = parseInt(numero3) + parseInt(numero4);
console.log("El resultado de la suma es: " + sumaResultado);
