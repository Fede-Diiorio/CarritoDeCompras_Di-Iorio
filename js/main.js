//CLASES
class Producto {
   constructor(id, nombre, precio, stock, imagen, descripcion, descripcionImagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
      this.imagen = imagen;
      this.descripcion = descripcion
      this.descripcionImagen = descripcionImagen;
   }
};

// FUNCIONES
function obtenerProductosDeJSON() {
   return new Promise((resolve, reject) => {
      fetch('../productos.json').then((response) => {
         return response.json();
      }).then((responseJson) => {
         for (const producto of responseJson) {
            productos.push(new Producto(...producto));
         }
         resolve();
      });
   });
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

function mostrarNumeroConComas(numero) {
   const numeroConDecimales = Number(numero).toFixed(2);
   return numeroFormateado = numeroConDecimales.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numeroDeProductosEnElCarrito() {
   const ls = JSON.parse(localStorage.getItem("carrito"));
   const numeroDeProductos = document.getElementById("contenedorParaCarritoIndex");
   numeroDeProductos.innerHTML = "";

   let totalCantidad = 0;

   if (ls) {
      ls.forEach((item) => {
         totalCantidad += item.cantidad;
      });
   }

   const numerito = document.createElement("a");
   numerito.className = "numero-carrito";
   numerito.innerText = totalCantidad;

   if (totalCantidad !== 0) {
      numerito.setAttribute('href', './pages/carrito.html');
      numeroDeProductos.append(numerito);
   }

}

function guardarProductoEnLocalStorage(producto, cantidad) {

   const agregarProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: parseInt(cantidad),
      total: producto.precio * cantidad,
      stock: producto.stock,
      imagen: `.${producto.imagen}`
   };

   // Si no hay productos cargados a Local Storage
   if (carrito === null) {
      carrito = [agregarProducto];

   } else {
      if (agregarProducto.stock >= agregarProducto.cantidad) {
         agregarProducto.stock -= agregarProducto.cantidad;
      }

      const buscarIndiceDeProducto = carrito.findIndex((el) => {
         return el.nombre === agregarProducto.nombre;
      });

      if (buscarIndiceDeProducto === -1) {
         carrito.push(agregarProducto);
      } else {
         carrito[buscarIndiceDeProducto].cantidad += parseInt(cantidad);
         carrito[buscarIndiceDeProducto].total += parseInt(agregarProducto.total);
         carrito[buscarIndiceDeProducto].stock -= parseInt(cantidad);
      }
   }
   // Actualizar Local Storage
   localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerProductosDeLocalStorage() {
   const carritoEnLocalStorage = JSON.parse(localStorage.getItem("carrito"));
   carrito = carritoEnLocalStorage ? carritoEnLocalStorage : [];
}

function renderizarProductos(productos) {
   const contenedor = document.getElementById("contenedor-js");
   contenedor.innerHTML = "";

   obtenerProductosDeLocalStorage();

   for (const producto of productos) {

      const divPadre = document.createElement("div");
      divPadre.className = "card col-12 col-md-6 col-lg-4 mb-5 width-card"

      const productoEnCarrito = carrito.find((item) => item.nombre === producto.nombre);
      const stockAMostrar = productoEnCarrito ? productoEnCarrito.stock : producto.stock;

      const imagenProducto = document.createElement("img");
      imagenProducto.className = "card-img-top";
      imagenProducto.setAttribute("src", producto.imagen);
      imagenProducto.setAttribute("alt", producto.descripcionImagen);

      const divCard = document.createElement("div");
      divCard.className = "card-cuerpo"

      const titulo = document.createElement("h4");
      titulo.className = "card-title";
      titulo.innerText = producto.nombre;

      const contenedorPrecioStock = document.createElement("p");
      contenedorPrecioStock.className = "contenedor-precio-stock";

      const precio = document.createElement("p");
      precio.className = "precio";
      precio.innerText = `$${mostrarNumeroConComas(producto.precio)}`;

      const contenedorParaBoton = document.createElement("div");
      contenedorParaBoton.className = "contenedor-boton";

      const botonComprar = document.createElement("p");
      botonComprar.className = "boton";
      botonComprar.innerText = "Comprar"

      const stock = document.createElement("p");
      stock.innerHTML = `<strong>Stock:</strong> ${stockAMostrar}`;

      botonComprar.addEventListener("click", () => {
         renderizarProductoIndividual(producto)
      });

      // Insertar elementos uno dentro de otro
      contenedorPrecioStock.append(precio, stock);
      divCard.append(titulo, contenedorPrecioStock, botonComprar);
      divPadre.append(imagenProducto, divCard);

      contenedor.append(divPadre);
   }
}

function renderizarProductoIndividual(producto) {

   const contenedor = document.getElementById("producto-individual")
   contenedor.innerHTML = "";
   document.body.classList.add('no-scroll');

   obtenerProductosDeLocalStorage();

   const productoEnCarrito = carrito.find((item) => item.nombre === producto.nombre);
   const stockAMostrar = productoEnCarrito ? productoEnCarrito.stock : producto.stock;

   const divAbuelo = document.createElement("div");
   divAbuelo.className = "overlayProducto"

   const divPadre = document.createElement("div");
   divPadre.className = "producto-individual container marco";

   const imagen = document.createElement("img");
   imagen.setAttribute("src", producto.imagen);
   imagen.className = "producto-individual__imagen";

   const informacion = document.createElement("div");
   informacion.className = "producto-individual__informacion";

   const titulo = document.createElement("h2");
   titulo.className = "producto-individual__titulo"
   titulo.innerText = `${producto.nombre}`;

   const descripcion = document.createElement("p");
   descripcion.className = "producto-individual__descripcion";
   descripcion.innerText = `${producto.descripcion}`;

   const precio = document.createElement("p");
   precio.className = "precio";
   precio.innerText = `$${mostrarNumeroConComas(producto.precio)}`;

   const stock = document.createElement("p");
   stock.className = "producto-individual__stock"
   stock.innerHTML = `<strong>Stock:</strong> ${stockAMostrar}`;

   const formDeCompra = document.createElement("form");
   formDeCompra.className = "producto-individual__form";

   const consultaCantidad = document.createElement("div");
   consultaCantidad.className = "producto-individual__cantidad";

   const consultaCantidadLabel = document.createElement("label");
   consultaCantidadLabel.innerText = "Cantidad:"

   const consultaCantidadInput = document.createElement("input");
   consultaCantidadInput.type = "number"
   consultaCantidadInput.value = 1;
   consultaCantidadInput.min = 1;

   const comprar = document.createElement("a");
   comprar.innerText = "Comprar";
   comprar.className = "boton";

   const volver = document.createElement("p");
   volver.innerText = "Cancelar"
   volver.className = "producto-individual__cancelar"

   const productoAgregado = document.createElement("h2");
   productoAgregado.className = "producto-individual__agregado";
   productoAgregado.innerText = "¡Agregado al Carrito!"

   const stockInsuficiente = document.createElement("h2");
   stockInsuficiente.className = "producto-individual__agregado";
   stockInsuficiente.innerText = "Stock Insuficiente"

   const numeroInvalido = document.createElement("h2");
   numeroInvalido.className = "producto-individual__agregado";
   numeroInvalido.innerText = "Debe ingresar un número mayor a 0."

   volver.addEventListener("click", () => {
      contenedor.innerHTML = "";
      renderizarProductos(productos);
      document.body.classList.remove('no-scroll');
   });

   comprar.addEventListener("click", () => {
      const cantidad = consultaCantidadInput.value;

      if (cantidad < 1) {
         Swal.fire({
            icon: "error",
            title: "Número Inválido",
            text: "Debe ingresar un número mayor a 0.",
         });
         renderizarProductoIndividual(producto);
      } else {
         if (cantidad > stockAMostrar) {
            Swal.fire({
               icon: "error",
               title: "Stock Insuficiente",
            });
            renderizarProductoIndividual(producto);
         } else {
            guardarProductoEnLocalStorage(producto, cantidad);
            Swal.fire({
               icon: "success",
               title: "¡Agregado al Carrito!",
            });
            document.body.classList.remove('no-scroll');
            numeroDeProductosEnElCarrito();
            renderizarProductos(productos);
            contenedor.innerHTML = "";
         };
      };
   });

   consultaCantidad.append(consultaCantidadLabel, consultaCantidadInput);
   formDeCompra.append(consultaCantidad, comprar, volver);
   informacion.append(titulo, descripcion, precio, stock, formDeCompra);
   divPadre.append(imagen, informacion);
   divAbuelo.append(divPadre);
   contenedor.append(divAbuelo);
}

// INICIO DEL PROGRAMA

let carrito = [];
const productos = [];

obtenerProductosDeLocalStorage();
BarraDeBusqueda();
filtradoPorOrden();
numeroDeProductosEnElCarrito();
obtenerProductosDeJSON().then(() => {
   renderizarProductos(productos);
});
