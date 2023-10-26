// FUNCIONES
function recorrerArregloParaImprimirPrompt(accion) {
    let concatenarTexto = "Ingrese el ID del producto que desea " + accion + " o 'S' para salir:\n";
    for (elemento of productos) {
        concatenarTexto += ("ID: " + elemento.id + " -- Nombre: " + elemento.nombre + " -- Precio: $" + elemento.precio + "\n");
    }

    return concatenarTexto;
}

function empujarPoductoAlCarritoDeCompras(opcion) {
    while (opcion.toLowerCase() !== "s") {
        if (opcion >= 0 && opcion <= 8) {
            let cantidad = parseInt(prompt("Ingrese la cantidad de productos que desea agreagar"))
            let contador = 0;
            if (cantidad > 0) {
                while (contador !== cantidad) {
                    carritoDeCompras.push(productos[parseInt(opcion)]);
                    contador++;
                }
            } else {
                alert("Debe ingresar un número válido mayor a 0.")
            }
        } else {
            alert("OPCIÓN INCORRECTA")
        }
        opcion = prompt(recorrerArregloParaImprimirPrompt("agregar"));
    }
}

function quitarProductoDelCarrito(opcion) {
    while (opcion.toLowerCase() !== "s") {
        mostrarPoductosDelCarrito(carritoDeCompras);
        carritoDeCompras = carritoDeCompras.filter((el) => el.id.includes(opcion));

        opcion = prompt("Elija el ID del producto que desea eliminar o ingrese 'S' para salir:\n" + mostrarPoductosDelCarrito(carritoDeCompras));
    }
}

function mostrarPoductosDelCarrito(arreglo) {
    let mostrarCarrito = arreglo.map((el) => el.id + ". " + el.nombre + " - $" + el.precio);
    return mostrarCarrito.join("\n");
}

function terminarCompra(arreglo) {
    const terminarCompra = arreglo.reduce((acc, el) => acc + el.precio, 0);

    return "\nEl total a pagar el: $" + terminarCompra;
}

// OBJETOS y VARIABLES
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
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
    new Producto(0, "Fuente Sentey 700W", 42000, 20),
    new Producto(1, "Memoria Ram 8gb", 13500, 120),
    new Producto(2, "Disco Rigido 2tb", 43500, 50),
    new Producto(3, "Webcam Philips", 12500, 15),
    new Producto(4, "Placa madre Asrock", 160000, 10),
    new Producto(5, "Procesador Intel I7", 165000, 5),
    new Producto(6, "Disco Solido Crucial 1tb", 32000, 30),
    new Producto(7, "Disco Solido ADATA 120gb", 9700, 70),
    new Producto(8, "Disco Solido Kingston 240gb", 13000, 90)
];

const carritoDeCompras = [];

// INICIO DEL PROGRAMA
let opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carrito\n3. Revisar carrito\n0. Terminar compra"));

while (opcion !== 0) {
    switch (opcion) {
        case 1:
            let opcionAgregar = prompt(recorrerArregloParaImprimirPrompt("agregar"));
            empujarPoductoAlCarritoDeCompras(opcionAgregar);
            break;

        case 2:
            let opcionQuitar = prompt("Elija el ID del producto que desea eliminar o ingrese 'S' para salir:\n" + mostrarPoductosDelCarrito(carritoDeCompras));
            quitarProductoDelCarrito(opcionQuitar, carritoDeCompras);
            break;

        case 3:
            alert(mostrarPoductosDelCarrito(carritoDeCompras));
            break;

        default:
            alert("OPCIÓN INCORRECTA")
    }

    opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));
}

alert(mostrarPoductosDelCarrito(carritoDeCompras) + terminarCompra(carritoDeCompras));