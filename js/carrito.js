// Funciones
function obtenerProductosDeLocalStorage() {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito) {
        renderizarTablaCarrito(carrito);
    }
}

function mostrarNumeroConComas(numero) {
    const numeroConDecimales = Number(numero).toFixed(2);
    const numeroFormateado = numeroConDecimales.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numeroFormateado;
}

function numeroDeProductosEnElCarrito() {
    const ls = JSON.parse(localStorage.getItem("carrito"));
    const numeroDeProductos = document.getElementById("contenedorParaCarrito");
    numeroDeProductos.innerHTML = "";

    let totalCantidad = 0;

    if (ls) {
        ls.forEach((item) => {
            // Accedes a la propiedad "cantidad" de cada objeto en ls
            totalCantidad += item.cantidad;
        });
    }

    const numerito = document.createElement("a");
    numerito.className = "numero-carrito";
    numerito.innerText = totalCantidad; // Muestra el total de la cantidad de productos

    if (totalCantidad !== 0) {
        numerito.setAttribute('href', '../index.html');
        numeroDeProductos.append(numerito);
    }

}

function ocultarHtml(id) {
    const vacio = document.getElementById(id);
    if (carrito.length > 0) {
        vacio.classList.add("d-none");
    } else {
        vacio.classList.remove("d-none");
    }
}

function ocultarHtmlInvertido(id) {
    const vacio = document.getElementById(id);
    if (carrito.length > 0) {
        vacio.classList.remove("d-none");
    } else {
        vacio.classList.add("d-none");
    }
}

function sumarTotalDelCarrito() {
    ls = JSON.parse(localStorage.getItem("carrito"));
    return total = ls.reduce((acc, el) => acc + el.total, 0);
}

function terminarCompra() {

    const terminarCompra = document.getElementById("terminarCompra");
    terminarCompra.innerText = "";

    const textoTerminarCompra = document.createElement("h4");
    textoTerminarCompra.classList.add("finalizar-compra");
    textoTerminarCompra.innerText = "Finalizar compra";

    terminarCompra.append(textoTerminarCompra);

    terminarCompra.addEventListener("click", () => {
        localStorage.setItem("carrito", JSON.stringify([]));
        obtenerProductosDeLocalStorage();
        renderizarModalDeFinalizarCompra();
        setTimeout(() => {
            ocultarHtmlInvertido("modalFinCompra")
        }, 2000)
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

function renderizarTotalDeProductos() {
    const total = sumarTotalDelCarrito()

    const contenedorTotal = document.getElementById("mostrarTotal");
    contenedorTotal.innerHTML = "";

    const cifraTotal = document.createElement("h4");
    cifraTotal.classList.add("cifra-total");
    cifraTotal.innerHTML = `<span>Total: </span> $${mostrarNumeroConComas(total)}`;

    contenedorTotal.append(cifraTotal);
}

function renderizarTablaCarrito(productosCarrito) {

    const contenedorCarrito = document.querySelector("#carrito");
    contenedorCarrito.innerHTML = "";

    for (const productoCarrito of productosCarrito) {

        const divPadre = document.createElement("div")
        divPadre.className = "tabla-productos";

        const imagenProducto = document.createElement("img");
        imagenProducto.className = "tabla-productos__img"
        imagenProducto.setAttribute("src", productoCarrito.imagen);

        const nombreProducto = document.createElement("p");
        nombreProducto.className = "tabla-productos__texto tabla-productos__texto--1";
        nombreProducto.innerText = productoCarrito.nombre;

        const precioProducto = document.createElement("p");
        precioProducto.className = "tabla-productos__texto tabla-productos__texto--2";
        precioProducto.innerText = `$${mostrarNumeroConComas(productoCarrito.precio)}`;

        const cantidadProducto = document.createElement("p");
        cantidadProducto.className = "tabla-productos__texto tabla-productos__texto--3";
        cantidadProducto.innerText = productoCarrito.cantidad;

        const totalPorProducto = document.createElement("p");
        totalPorProducto.className = "tabla-productos__texto tabla-productos__texto--4";
        totalPorProducto.innerText = `$${mostrarNumeroConComas(productoCarrito.total)}`;

        const quitarProducto = document.createElement("p");
        quitarProducto.className = "tabla-productos__texto tabla-productos__texto--5";

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.innerText = "X";

        // Agregar evento al boton
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(productoCarrito);
        });

        // Agregar elementos uno adentro de otro
        quitarProducto.append(botonEliminar);
        divPadre.append(imagenProducto, nombreProducto, precioProducto, cantidadProducto, totalPorProducto, quitarProducto);
        contenedorCarrito.append(divPadre);
    }
    ocultarHtml("mensajeCarrito");
    ocultarHtmlInvertido("terminarCompra");
    ocultarHtmlInvertido("mostrarTotal");
    renderizarTotalDeProductos();
    terminarCompra();
    numeroDeProductosEnElCarrito();
}

function renderizarModalDeFinalizarCompra() {

    const modal = document.getElementById("modalFinCompra");
    modal.innerHTML = "";

    const modalMarcoFondo = document.createElement("div");
    modalMarcoFondo.classList.add("overlayModal")

    const modalMarco = document.createElement("div");
    modalMarco.classList.add("marco", "modal-final-compra__marco");

    const modalEncabezado = document.createElement("h2");
    modalEncabezado.classList.add("modal-final-compra__titulo");
    modalEncabezado.innerHTML = "¡Compra Finalizada!"

    const modalMensaje = document.createElement("P");
    modalMensaje.classList.add("modal-final-compra__mensaje");
    modalMensaje.innerText = "Su pedido ha pasado a la siguiente instancia. Lo esperamos en nuestro local para retirarlo. Muchas gracias por su compra."

    modalMarcoFondo.append(modalMarco);
    modalMarco.append(modalEncabezado, modalMensaje);
    modal.append(modalMarcoFondo);
}

let carrito = [];

obtenerProductosDeLocalStorage();
renderizarTablaCarrito(carrito);
ocultarHtml("mensajeCarrito");