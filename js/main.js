// FUNCIONES
function RecorrerProductosParaMostrarTextos() {
    let concatenarProductos = "";
    for (const producto of todosLosProductos) {
        concatenarProductos += (producto.id + ". " + producto.nombre + " = $" + producto.precio + "\n");
    }
    return concatenarProductos;
}

function seleccionarProducto() {
    return seleccionarProducto = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + RecorrerProductosParaMostrarTextos()));

}

function empujarProductoAlCarrito(opcion, arreglo) {
    for (const producto of todosLosProductos) {
        if (opcion === producto.id) {
            const productoParaCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio
            }
            arreglo.push(productoParaCarrito);
            console.log(productoParaCarrito);
        }
    }
}

function agregarAlCarrito(opcion) {
    opcion = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + RecorrerProductosParaMostrarTextos()));

    while (opcion !== 0) {
        empujarProductoAlCarrito(opcion, carrito);
        opcion = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + RecorrerProductosParaMostrarTextos()));
    }

}

function filtrarYQuitarDelCarrito(arreglo, opcion) {
    let filtrado = arreglo.some((el) => el.id === opcion);
    console.log("Opcion " + opcion);
    console.log("el.id " + visibilizarCarrito(arreglo));
    console.log("Filtrado " + filtrado);
}

function quitarDelCarrito(opcion) {
    opcion = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + RecorrerProductosParaMostrarTextos()));

    while (opcion !== 0) {
        filtrarYQuitarDelCarrito(carrito, opcion);
        opcion = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + RecorrerProductosParaMostrarTextos()));
    }
}

function visibilizarCarrito(arreglo) {
    console.log(arreglo.map(producto => producto.id + ". " + producto.nombre + " - $" + producto.precio));
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

const producto1 = new Producto(1, "Fuente Sentey 700W", 42000, 20);
const producto2 = new Producto(2, "Memoria Ram 8gb", 13500, 120);
const producto3 = new Producto(3, "Disco Rigido 2tb", 43500, 50);
const producto4 = new Producto(4, "Webcam Philips", 12500, 15);
const producto5 = new Producto(5, "Placa madre Asrock", 160000, 10);
const producto6 = new Producto(6, "Procesador Intel I7", 165000, 5);
const producto7 = new Producto(7, "Disco Solido Crucial 1tb", 32000, 30);
const producto8 = new Producto(8, "Disco Solido ADATA 120gb", 9700, 70);
const producto9 = new Producto(9, "Disco Solido Kingston 240gb", 13000, 90);

// ARREGLOS
const todosLosProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];
const carrito = [];

// INICIO DEL PROGRAMA
let opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));

while (opcion !== 0) {
    switch (opcion) {
        case 1:
            agregarAlCarrito(opcion);
            console.log(carrito);
            break;

        case 2:
            quitarDelCarrito(opcion);
            break;

        case 3:
            visibilizarCarrito(carrito);
            break;

        default:
            alert("OPCIÓN INCORRECTA")
    }

    opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));
}

console.log(carrito.map(producto => `Nombre: ${producto.nombre}, Precio: ${producto.precio}`));
