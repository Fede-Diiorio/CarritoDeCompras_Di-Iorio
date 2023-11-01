// FUNCIONES
function recorrerArregloParaImprimirPrompt(accion) {
   let concatenarTexto = "Ingrese el ID del producto que desea " + accion + " o 'S' para salir:\n";
   for (const elemento of productos) {
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

function renderizarProductos(productos) {
   const contenedor = document.getElementById("contenedor-js");
   contenedor.innerHTML = "";

   for (const producto of productos) {

      const divPadre = document.createElement("div");
      divPadre.className = "card col-12 col-md-6 col-lg-4 mb-5 width-card"

      const imagenProducto = document.createElement("img");
      imagenProducto.className = "card-img-top";
      imagenProducto.setAttribute("src", producto.imagen);
      imagenProducto.setAttribute("alt", producto.descripcionImagen);

      const divCard = document.createElement("div");
      divCard.className = "card-body"

      const titulo = document.createElement("h4");
      titulo.className = "card-title";
      titulo.innerText = producto.nombre;

      const descripcion = document.createElement("p");
      descripcion.className = "card-text";
      descripcion.innerText = producto.descripcion;

      const precio = document.createElement("p");
      precio.className = "precio";
      precio.innerText = `$${producto.precio}`;

      const botonComprar = document.createElement("a");
      botonComprar.className = "btn btn-primary";
      botonComprar.innerText = "Comprar"

      botonComprar.addEventListener("click", () => window.location.href = "../pages/producto.html");


      // Insertar elementos uno dentro de otro
      divCard.append(titulo, descripcion, precio, botonComprar);
      divPadre.append(imagenProducto, divCard);

      contenedor.append(divPadre);
   }
}

function BarraDeBusqueda() {
   const BarraDeBusqueda = document.getElementById("inputBuscarProductos");

   BarraDeBusqueda.addEventListener("keyup", () => {
      const value = BarraDeBusqueda.value
      const productosFiltrados = productos.filter((producto) => {
         return producto.nombre.toLowerCase().includes(value.toLowerCase());
      });

      renderizarProductos(productosFiltrados);
   });
}

//VARIABLES
class Producto {
   constructor(id, nombre, precio, stock, imagen, descripcion, descripcionImagen, categoria) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
      this.imagen = imagen;
      this.descripcion = descripcion
      this.descripcionImagen = descripcionImagen;
      this.categoria = categoria;
   }
}

const productos = [
   new Producto(0, "Fuente Sentey 700W", 42000, 10, "../img/Fuente.webp", "Fuente sentey 700w hbp700-gs 80 plus bronze active pfc autofan 20+4x1 4+4pinesx1 satax6 molexx 2pci-e6+2x2", "Imagen Fuente Sentey", "Fuente"),
   new Producto(1, "Memoria Ram 8gb", 13500, 60, "../img/RAM.webp", "Memoria Ddr3 8gb 1600mhz 1.5v Desktop Mushkin Essentials Latencia 11-11-11-28", "Imagen Memoria RAM", "Memoria"),
   new Producto(2, "Disco Rigido 2tb", 43500, 10, "../img/HDD.webp", "Disco rigido 2tb 3.5 sata 3 seagate barracuda desktop escritorio", "Imagen Disco Rigido HDD", "Unidad de Almacenamiento"),
   new Producto(3, "Webcam Philips", 12500, 5, "../img/webcam.webp", "Webcam philips p406b fhd 1080p usb 1920x1080 30fps angulo de vision 70 grados", "Imagen Webcam Philips", "Webcam"),
   new Producto(4, "Placa Madre Asrock", 160000, 10, "../img/mother.webp", "Mother asrock z690 extreme hdmi displayport 4xddr4 1xps2 5xusb 1xusbtipoc 3xpciex16 1xpciex1 8xsata2xm21xm2 wifi rj45 7.1 1700 compatible generacion 12 y 13 - Ya actualizado", "Imagen Placa Madre Asrock", "Placa Madre"),
   new Producto(5, "Procesador Intel I7", 165000, 5, "../img/procesador.webp", "Procesador intel comet lake i7-10700 8 nucleos 16 hilos 2.9ghz a 4.8ghz socket1200 solo windows 10 64Bits. Decima generacion trae cooler trae video integrado", "Imagen Procesador Intel I7", "Procesador"),
   new Producto(6, "Disco Solido Crucial 1tb", 32000, 10, "../img/m21tb.webp", "Disco solido SSD 1TB M2 Cruscial P3 22x80mm interface PCIE NVME 3D NAND lectura 3500MB escritura 1900mb PCIE G3 1X4.", "Imagen Disco M.2 Crucial", "Unidad de Almacenamiento"),
   new Producto(7, "Disco Solido ADATA 120gb", 9700, 30, "../img/ssd120.webp", "Disco solido SSD 120BG 2.5 sata III Adata ultimate SU650 lectura 520MB escritura 450MB.", "Imagen Disco SSD ADATA", "Unidad de Almacenamiento"),
   new Producto(8, "Disco Solido Kingston 240gb", 13000, 20, "../img/ssd240.webp", "Disco solido SSD 240GB 2.5 sata III Kingston A400 lectura hasta 500MB y escritura hasta 450MB.", "Disco SSD Kingston", "Unidad de Almacenamiento")
];

let carritoDeCompras = [];

// INICIO DEL PROGRAMA
// let opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carrito\n3. Revisar carrito\n0. Terminar compra"));

// // inicio del bulce principal
// while (opcion !== 0) {
//    switch (opcion) {
//       case 1:
//          let opcionAgregar = prompt(recorrerArregloParaImprimirPrompt("agregar"));
//          empujarPoductoAlCarritoDeCompras(opcionAgregar);
//          break;

//       case 2:
//          let opcionQuitar = prompt("Elija el numero producto que desea eliminar o ingrese 'S' para salir:\n" + mostrarPoductosDelCarrito(carritoDeCompras));
//          quitarProductoDelCarrito(opcionQuitar, carritoDeCompras);
//          break;

//       case 3:
//          alert(mostrarPoductosDelCarrito(carritoDeCompras));
//          break;

//       default:
//          alert("OPCIÓN INCORRECTA")
//    }

//    opcion = parseInt(prompt("Bienvenido a SySPC. Elija la opción deseada: \n1. Agregar al carrito\n2. Quitar del carrito\n3. Revisar carrito\n0. Terminar compra"));
// }

// alert(mostrarPoductosDelCarrito(carritoDeCompras) + terminarCompra(carritoDeCompras));

renderizarProductos(productos);
BarraDeBusqueda();