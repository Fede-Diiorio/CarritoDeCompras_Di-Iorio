// FUNCIONES
function recorrerArregloParaImprimirPrompt() {
    let concatenarTexto = "Ingrese el número del producto que desea agregar o 'S' para salir:\n";
    let contador = 0;
    for (elemento of productos) {
        concatenarTexto += (contador + ". Nombre: " + elemento.nombre + " Precio: $" + elemento.precio + "\n");
        contador++;
    }

    return concatenarTexto;
}

function empujarPoductoAlCarritoDeCompras(opcion) {
    while (opcion.toLowerCase() !== "s") {
        if (opcion >= 0 && opcion <= 8) {
            carritoDeCompras.push(productos[parseInt(opcion)]);
        } else {
            alert("OPCIÓN INCORRECTA")
        }
        opcion = prompt(recorrerArregloParaImprimirPrompt());
    }
}

// OBJETOS y VARIABLES
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    verStock() {
        alert("Producto: " + this.nombre + "\nStock: " + this.stock);
    }
}

// ARREGLOS
const productos = [
    new Producto("Fuente Sentey 700W", 42000, 20),
    new Producto("Memoria Ram 8gb", 13500, 120),
    new Producto("Disco Rigido 2tb", 43500, 50),
    new Producto("Webcam Philips", 12500, 15),
    new Producto("Placa madre Asrock", 160000, 10),
    new Producto("Procesador Intel I7", 165000, 5),
    new Producto("Disco Solido Crucial 1tb", 32000, 30),
    new Producto("Disco Solido ADATA 120gb", 9700, 70),
    new Producto("Disco Solido Kingston 240gb", 13000, 90)
];

const carritoDeCompras = [];

// INICIO DEL PROGRAMA
let opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));

while (opcion !== 0) {
    switch (opcion) {
        case 1:
            let opcion = prompt(recorrerArregloParaImprimirPrompt());
            empujarPoductoAlCarritoDeCompras(opcion);
            break;

        case 2:
            console.log("Caso 2");
            break;

        case 3:
            alert("El carrito se muestra mediante consola")
            console.log(carritoDeCompras);
            break;

        default:
            alert("OPCIÓN INCORRECTA")
    }

    opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));
}




