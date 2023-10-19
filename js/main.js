// FUNCIONES
function recorrerProductos() {
    let concatenarProductos = "";
    for (const producto of todosLosProductos) {
        concatenarProductos += (producto.id + ". " + producto.nombre + " = $" + producto.precio + "\n");
    }
    return concatenarProductos;
}

function empujarProductoAlCarrito(numero) {
    for (const producto of todosLosProductos) {
        if (numero === producto.id) {
            carrito.push(producto.nombre + " - $" + producto.precio);
        }
    }
}

function seleccionarProducto() {
    const seleccionarProducto = parseInt(prompt("Ingrese un número acorde al producto deseado: \n" + recorrerProductos()));
    return seleccionarProducto;
}

function agregarAlCarrito() {
    let opcion = seleccionarProducto();

    while (opcion !== 0) {
        empujarProductoAlCarrito(opcion);
        opcion = seleccionarProducto();
    }
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
const opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carriton\n3. Revisar carrito\n0. Terminar compra"));

agregarAlCarrito(opcion);
console.log(carrito);
