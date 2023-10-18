// FUNCIONES
function pedirOperacion() {
    return parseInt(prompt("Ingrese el número del correspondiente al producto:\n1. Fuente Sentey 700W = $42000 ==> " + contador1 + "\n2. Memoria Ram 8gb = $13500 ==> " + contador2 + "\n3. Disco Rigido 2tb = $43500 ==> " + contador3 + "\n4. Webcam Philips = $12500 ==> " + contador4 + "\n5. Placa Madre Asrock = $160000 ==> " + contador5 + "\n6. Procesador Intel I7 = $165000 ==> " + contador6 + "\n7. Disco Solido Crucial 1tb = $32000 ==> " + contador7 + "\n8. Disco Solido ADATA 120gb = $9700 ==> " + contador8 + "\n9. Disco Solido Kingston 240gb = $13000 ==> " + contador9 + "\n0. Dejar de agregar productos"));
}

function contarProductos() {
    productos = contador1 + contador2 + contador3 + contador4 + contador5 + contador6 + contador7 + contador8 + contador9;
    return productos;
}

function sumarTotal() {
    total = (producto1 * contador1) + (producto2 * contador2) + (producto3 * contador3) + (producto4 * contador4) + (producto5 * contador5) + (producto6 * contador6) + (producto7 * contador7) + (producto8 * contador8) + (producto9 * contador9);
    return total;
}

function agregarAlCarrito() {
    let carrito = pedirOperacion();
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
            case 6:
                contador6++;
                break;
            case 7:
                contador7++;
                break;
            case 8:
                contador8++;
                break;
            case 9:
                contador9++;
                break;
            default:
                alert("Número de producto no válido. Por favor, seleccione un número de producto válido.");
                break;
        }
        carrito = pedirOperacion();
    }
}

function quitarDelCarrito() {
    let carrito = pedirOperacion();
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
            case 6:
                if (contador6 > 0) {
                    contador6--;
                }
                break;
            case 7:
                if (contador7 > 0) {
                    contador7--;
                }
                break;
            case 8:
                if (contador8 > 0) {
                    contador8--;
                }
                break;
            case 9:
                if (contador9 > 0) {
                    contador9--;
                }
                break;
            default:
                alert("Número de producto no válido o no tiene ese producto agregado. Por favor, seleccione un número de producto válido.");
                break;
        }
        carrito = pedirOperacion();
    }
}

function consultarCarrito() {
    alert("1. Fuente Sentey 700W = $42000 ==> " + contador1 + "\n2. Memoria Ram 8gb = $13500 ==> " + contador2 + "\n3. Disco Rigido 2tb = $43500 ==> " + contador3 + "\n4. Webcam Philips = $12500 ==> " + contador4 + "\n5. Placa Madre Asrock = $160000 ==> " + contador5 + "\n6. Procesador Intel I7 = $165000 ==> " + contador6 + "\n7. Disco Solido Crucial 1tb = $32000 ==> " + contador7 + "\n8. Disco Solido ADATA 120gb = $9700 ==> " + contador8 + "\n9. Disco Solido Kingston 240gb = $13000 ==> " + contador9 + "\nUsted tiene agregados " + contarProductos() + " productos al carrito sumando un total de $" + sumarTotal());
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

        numero = parseInt(prompt("Ingrese la operación deseada: \n1. Agregar al Carrito\n2. Quitar del Carrito\n3. Consultar Carrito\n0. Terminar Compra"));

    }

    terminarCompra();
}

// VARIABLES
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

const producto1 = new Producto("Fuente Sentey 700W", 42000, 20);
const producto2 = new Producto("Memoria Ram 8gb", 13500, 120);
const producto3 = new Producto("Disco Rigido 2tb", 43500, 50);
const producto4 = new Producto("Webcam Philips", 12500, 15);
const producto5 = new Producto("Placa madre Asrock", 160000, 10);
const producto6 = new Producto("Procesador Intel I7", 165000, 5);
const producto7 = new Producto("Disco Solido Crucial 1tb", 32000, 30);
const producto8 = new Producto("Disco Solido ADATA 120gb", 9700, 70);
const producto9 = new Producto("Disco Solido Kingston 240gb", 13000, 90);

let contador1 = 0;
let contador2 = 0;
let contador3 = 0;
let contador4 = 0;
let contador5 = 0;
let contador6 = 0;
let contador7 = 0;
let contador8 = 0;
let contador9 = 0;

// INICIO DEL PROGRAMA
let numero = parseInt(prompt("Ingrese la operación deseada: \n1. Agregar al Carrito\n2. Quitar del Carrito\n3. Consultar Montos\n0. Terminar compra"));
carrito(numero);

// FINAL DEL PROGRAMA
