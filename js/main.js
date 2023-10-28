// FUNCIONES
function recorrerArregloParaImprimirPrompt(accion) {
   let concatenarTexto = "Ingrese el ID del producto que desea " + accion + " o 'S' para salir:\n";
   for (elemento of productos) {
      concatenarTexto += (elemento.id + ". Nombre: " + elemento.nombre + " -- Precio: $" + elemento.precio + "\n");
   }

   return concatenarTexto;
}

function empujarPoductoAlCarritoDeCompras(opcion) {
   let contador = 0;
   while (opcion.toLowerCase() !== "s") {
      if (opcion >= 0 && opcion <= 8) {
         let cantidad = parseInt(prompt("Ingrese la cantidad de productos que desea agreagar"))
         if (cantidad > 0 && cantidad <= productos[opcion].stock) {
            while (contador !== cantidad) {
               carritoDeCompras.push(productos[parseInt(opcion)]);
               contador++;
               productos[opcion].stock--;
            }
         } else if (cantidad >= productos[opcion].stock) {
            alert("Solamente contamos con un stock de " + productos[opcion].stock + " unidades de ese producto.")
         }
         else {
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
      if (opcion >= 0 && opcion < carritoDeCompras.length) {
         const productoARetornar = carritoDeCompras.splice(opcion, 1)[0];
         productos[productoARetornar.id].stock++;
      } else {
         alert("Opción incorrecta. Ingrese un número válido.");
      }

      opcion = prompt("Elija el numero producto que desea eliminar o ingrese 'S' para salir:\n" + mostrarPoductosDelCarrito(carritoDeCompras));
   }
}

function mostrarPoductosDelCarrito(arreglo) {
   let mostrarCarrito = arreglo.map((el, index) => index + ". " + el.nombre + " -- $" + el.precio);
   return mostrarCarrito.join("\n");
}

function redondearEnvioParaCarritoDeCompras(numero) {
   return Math.round(numero / 1000) * 1000;
}

function terminarCompra(arreglo) {
   let terminarCompra = arreglo.reduce((acc, el) => acc + el.precio, 0);
   if (terminarCompra !== 0) {
      let tipoDeEnvio = parseInt(prompt("Ingrese 1 para envio a domicilio o 2 para retirar por el local."))
      while (tipoDeEnvio !== 1 || tipoDeEnvio !== 2) {

         switch (tipoDeEnvio) {
            case 1:
               if (terminarCompra < 200000) {
                  terminarCompra += 5000;
                  return "\nTotal a pagar con envio incluido: $" + redondearEnvioParaCarritoDeCompras(terminarCompra);
               } else if (terminarCompra > 200000) {
                  terminarCompra += 2500;
                  return "\nTotal a pagar con envio incluido: $" + redondearEnvioParaCarritoDeCompras(terminarCompra);
               } else if (terminarCompra > 500000) {
                  return "El envio es sin cargo.\nTotal a pagar: $" + terminarCompra;
               }
               break;
            case 2:
               return "\nEl total a pagar el: $" + terminarCompra;
            default:
               alert("Ingrese una opción válida.")
         }
         tipoDeEnvio = parseInt(prompt("Ingrese 1 para envio a domicilio o 2 para retirar por el local."))
      }
   }
   return ("Gracias por consultar nuestros precios.");
}

//VARIABLES
class Producto {
   constructor(id, nombre, precio, stock) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
   }
}

const productos = [
   new Producto(0, "Fuente Sentey 700W", 42000, 10),
   new Producto(1, "Memoria Ram 8gb", 13500, 60),
   new Producto(2, "Disco Rigido 2tb", 43500, 10),
   new Producto(3, "Webcam Philips", 12500, 5),
   new Producto(4, "Placa madre Asrock", 160000, 10),
   new Producto(5, "Procesador Intel I7", 165000, 5),
   new Producto(6, "Disco Solido Crucial 1tb", 32000, 10),
   new Producto(7, "Disco Solido ADATA 120gb", 9700, 30),
   new Producto(8, "Disco Solido Kingston 240gb", 13000, 20)
];

let carritoDeCompras = [];

// INICIO DEL PROGRAMA
let opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carrito\n3. Revisar carrito\n0. Terminar compra"));

// inicio del bulce principal
while (opcion !== 0) {
   switch (opcion) {
      case 1:
         let opcionAgregar = prompt(recorrerArregloParaImprimirPrompt("agregar"));
         empujarPoductoAlCarritoDeCompras(opcionAgregar);
         break;

      case 2:
         let opcionQuitar = prompt("Elija el numero producto que desea eliminar o ingrese 'S' para salir:\n" + mostrarPoductosDelCarrito(carritoDeCompras));
         quitarProductoDelCarrito(opcionQuitar, carritoDeCompras);
         break;

      case 3:
         alert(mostrarPoductosDelCarrito(carritoDeCompras));
         break;

      default:
         alert("OPCIÓN INCORRECTA")
   }

   opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carrito\n3. Revisar carrito\n0. Terminar compra"));
}

alert(mostrarPoductosDelCarrito(carritoDeCompras) + terminarCompra(carritoDeCompras));