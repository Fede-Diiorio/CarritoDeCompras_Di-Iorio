// FUNCIONES
function contarProductos() {
    productos = contador1 + contador2 + contador3 + contador4 + contador5;
    return productos;
}

function sumarTotal() {
    total = (producto1 * contador1) + (producto2 * contador2) + (producto3 * contador3) + (producto4 * contador4) + (producto5 * contador5);
    return total;
}

function agregarAlCarrito() {
    let carrito = parseInt(prompt("Ingrese el número del producto que desea añadir al carrito:\n1. Producto1 = 1000\n2. Producto2 = 500\n3. Producto3 = 2000\n4. Producto4 = 750\n5. Producto5 = 1225\n0. Dejar de agregar productos"));

    while (carrito !== 0) {
        switch (carrito) {
            case 1:
                contador1++;
                break;
            case 2:
                contador2++;
                break;
            case 3:
                contador3++;
                break;
            case 4:
                contador4++;
                break;
            case 5:
                contador5++;
                break;
            default:
                alert("Número de producto no válido. Por favor, seleccione un número de producto válido.");
                break;
        }
        carrito = parseInt(prompt("Ingrese el número del producto que desea añadir al carrito:\n1. Producto1 = 1000\n2. Producto2 = 500\n3. Producto3 = 2000\n4. Producto4 = 750\n5. Producto5 = 1225\n0. Dejar de agregar productos"));
    }
}

function quitarDelCarrito() {
    let carrito = parseInt(prompt("Ingrese el número del producto que desea añadir al carrito:\n1. Producto1 = " + contador1 + "\n2. Producto2 = " + contador2 + "\n3. Producto3 = " + contador3 + "\n4. Producto4 = " + contador4 + "\n5. Producto5 = " + contador5 + "\n0. Dejar de quitar productos"));

    while (carrito !== 0) {
        switch (carrito) {
            case 1:
                if (contador1 > 0) {
                    contador1--;
                }
                break;
            case 2:
                if (contador2 > 0) {
                    contador2--;
                }
                break;
            case 3:
                if (contador3 > 0) {
                    contador3--;
                }
                break;
            case 4:
                if (contador4 > 0) {
                    contador4--;
                }
                break;
            case 5:
                if (contador5 > 0) {
                    contador5--;
                }
                break;
            default:
                alert("Número de producto no válido o no tiene ese producto agregado. Por favor, seleccione un número de producto válido.");
                break;
        }
        carrito = parseInt(prompt("Ingrese el número del producto que desea añadir al carrito:\n1. Producto1 = " + contador1 + "\n2. Producto2 = " + contador2 + "\n3. Producto3 = " + contador3 + "\n4. Producto4 = " + contador4 + "\n5. Producto5 = " + contador5 + "\n0. Dejar de quitar productos"));
    }
}

function consultarCarrito() {
    alert("Producto1 = " + contador1 + "\nProducto2 = " + contador2 + "\nProducto3 = " + contador3 + "\nProducto4 = " + contador4 + "\nProducto5 = " + contador5 + "\nUsted tiene agregados " + contarProductos() + " productos al carrito sumando un total de $" + sumarTotal());
}

function terminarCompra() {
    if (sumarTotal() > 0) {
        alert("El total de su compra es de: $" + sumarTotal() + "\nMuchas gracias por confiar en nosotros.");
    } else {
        alert("No hay ningun producto agregado al carrito.");
    }
}

function carrito(numero) {

    while (numero !== 0) {
        switch (numero) {
            case 1:
                agregarAlCarrito();
                break;

            case 2:
                quitarDelCarrito();
                break;

            case 3:
                consultarCarrito();
                break;

            default:
                alert("Ingrese un número válido.");
                break;
        }

        numero = parseInt(prompt("Ingrese la operación deseada: \n1. Agregar al Carrito\n2. Quitar del Carrito\n3. Corroborar Montos\n0. Terminar Compra"));

    }

    terminarCompra();
}

// VARIABLES
const producto1 = 1000;
const producto2 = 500;
const producto3 = 2000;
const producto4 = 750;
const producto5 = 1225;
let contador1 = 0;
let contador2 = 0;
let contador3 = 0;
let contador4 = 0;
let contador5 = 0;

// INICIO DEL PROGRAMA
let numero = parseInt(prompt("Ingrese la operación deseada: \n1. Agregar al Carrito\n2. Quitar del Carrito\n3. Corroborar Montos\n0. Terminar compra"));
carrito(numero);

// FINAL DEL PROGRAMA
