//CLASES
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
};

// FUNCIONES
function renderizarProductosParaCarrito(arreglo) {
   const contenedor = document.getElementById("contenedorParaCarrito");

   for (const producto of arreglo) {
      const divPadre = document.createElement("div");
      divPadre.className = "carrito";

      const divContenedor = document.createElement("div");
      divContenedor.className = "carrito__producto";

      const imgCarrito = document.createElement("img");
      imgCarrito.className = "carrito__imagen";
      imgCarrito.setAttribute("src", producto.imagen);
      imgCarrito.setAttribute("alt", producto.descripcionImagen);

      const divInformacion = document.createElement("div");
      divInformacion.className = "carrito__informacion";

      const nombreProducto = document.createElement("p");
      nombreProducto.className = "carrito__texto";
      nombreProducto.innerHTML = `<strong>Nombre:</strong> ${producto.nombre}`;

      const precioProducto = document.createElement("p");
      precioProducto.className = "carrito__texto";
      precioProducto.innerHTML = `<strong>Precio:</strong> ${producto.precio}`;

      const cantidadProducto = document.createElement("p");
      cantidadProducto.className = "carrito__texto";
      cantidadProducto.innerHTML = `<strong>Cantidad:</strong> ${producto.stock}`;

      const totalProducto = document.createElement("p");
      totalProducto.className = "carrito__texto";
      totalProducto.innerHTML = `<strong>Total:</strong> ${producto.precio}`;

      divInformacion.append(nombreProducto, precioProducto, cantidadProducto, totalProducto);
      divContenedor.append(imgCarrito, divInformacion);
      divPadre.append(divContenedor);

      contenedor.append(divPadre);
   }

}

function BarraDeBusqueda() {
   const formBusqueda = document.getElementById("formBusqueda");
   const BarraDeBusqueda = document.getElementById("inputBuscarProductos");

   formBusqueda.addEventListener("submit", (event) => {
      event.preventDefault();

      const value = BarraDeBusqueda.value;
      const productosFiltrados = productos.filter((producto) => {
         return producto.nombre.toLowerCase().includes(value.toLowerCase());
      });

      renderizarProductos(productosFiltrados);
   });
}

function filtradoPorOrden() {
   const ordenFiltros = document.getElementById("ordenFiltros");

   ordenFiltros.addEventListener("click", (e) => {
      const target = e.target;

      if (target.type === "radio") {
         if (target.id === "mayorPrecio") {
            // Ordenar productos por mayor precio
            productos.sort((a, b) => b.precio - a.precio);
         } else if (target.id === "menorPrecio") {
            // Ordenar productos por menor precio
            productos.sort((a, b) => a.precio - b.precio);
         } else if (target.id === "alfabetoAZ") {
            productos.sort((a, b) => {
               if (a.nombre > b.nombre) {
                  return 1;
               };
               if (a.nombre < b.nombre) {
                  return -1;
               };
               return 0;
            });
         } else if (target.id === "alfabetoZA") {
            productos.sort((a, b) => {
               if (a.nombre > b.nombre) {
                  return -1;
               };
               if (a.nombre < b.nombre) {
                  return 1;
               };
               return 0;
            });
         };

         renderizarProductos(productos);
      };
   });
}

function eliminarProducto(producto) {
   const indeceParaEliminarProducto = carrito.findIndex((el) => {
      return producto.nombre === el.nombre;
   });

   if (indeceParaEliminarProducto !== -1) {
      carrito.splice(indeceParaEliminarProducto, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarTablaCarrito(carrito);
   }
}

function obtenerProductosDeLocalStorage() {

   carrito = JSON.parse(localStorage.getItem("carrito"));

   if (carrito) {
      renderizarTablaCarrito(carrito);
   }

}

function guardarProductoEnLocalStorage(producto, cantidad) {
   const agregarProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: parseInt(cantidad),
   };

   // Si no hay productos cargados a Local Storage
   if (carrito === null) {
      carrito = [agregarProducto];

   } else {

      // Buscar indice de producto en local storage
      const buscarIndiceDeProducto = carrito.findIndex((el) => {
         return el.nombre === agregarProducto.nombre;
      });

      if (buscarIndiceDeProducto === -1) {
         carrito.push(agregarProducto);
      } else {
         carrito[buscarIndiceDeProducto].cantidad += parseInt(cantidad);
      }

   }
   // Actualizar Local Storage
   localStorage.setItem("carrito", JSON.stringify(carrito));
   renderizarTablaCarrito(carrito);
}

function renderizarTablaCarrito(productosCarrito) {

   const tbody = document.querySelector("#carrito table tbody");
   tbody.innerHTML = "";

   for (const productoCarrito of productosCarrito) {

      const tr = document.createElement("tr");

      const tdNombre = document.createElement("td");
      tdNombre.innerText = productoCarrito.nombre;

      const tdPrecio = document.createElement("td");
      tdPrecio.innerText = `$${productoCarrito.precio}`;

      const tdCantidad = document.createElement("td");
      tdCantidad.innerText = productoCarrito.cantidad;

      const tdEliminar = document.createElement("td");

      const botonEliminar = document.createElement("button");
      botonEliminar.className = "btn btn-danger";
      botonEliminar.innerText = "Eliminar";

      // Agregar evento al boton
      botonEliminar.addEventListener("click", () => {
         eliminarProducto(productoCarrito);
      });

      // Agregar elementos uno adentro de otro
      tdEliminar.append(botonEliminar);
      tr.append(tdNombre, tdPrecio, tdCantidad, tdEliminar);

      tbody.append(tr);
   }
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

      const contenedorParaBoton = document.createElement("div");
      contenedorParaBoton.className = "contenedor-boton";

      const botonComprar = document.createElement("label");
      botonComprar.className = "btn btn-primary";
      botonComprar.innerText = "Comprar"

      const cantidadComprar = document.createElement("input");
      cantidadComprar.className = "cantidad-comprar";
      cantidadComprar.type = "number";
      cantidadComprar.value = 1;
      cantidadComprar.min = 1;

      const stock = document.createElement("p");
      stock.innerHTML = `<strong>Stock:</strong> ${producto.stock}`;

      botonComprar.addEventListener("click", () => {
         const cantidad = cantidadComprar.value;

         if (cantidad < 1) {
            alert("INGRESE UN NÚMERO VÁLIDO")
         } else {
            if (cantidad > producto.stock) {
               alert("STOCK INSUFICIENTE");
            } else {

               guardarProductoEnLocalStorage(producto, cantidad);
            };
         };
      });

      // Insertar elementos uno dentro de otro
      contenedorParaBoton.append(botonComprar, cantidadComprar)
      divCard.append(titulo, descripcion, stock, precio, contenedorParaBoton);
      divPadre.append(imagenProducto, divCard);

      contenedor.append(divPadre);
   }
}

// INICIO DEL PROGRAMA
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

let carrito = [];

renderizarProductos(productos);
BarraDeBusqueda();
filtradoPorOrden();
obtenerProductosDeLocalStorage();