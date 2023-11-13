// Funciones
function mostrarNumeroConComas(numero) {
    const numeroConDecimales = Number(numero).toFixed(2);
    const numeroFormateado = numeroConDecimales.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numeroFormateado;
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
    ocultarHtml("MensajeCarrito");
    ocultarHtmlInvertido("mostrarTotal");
    renderizarTotalDeProductos();
    numeroDeProductosEnElCarrito();
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

function sumarTotalDelCarrito() {
    ls = JSON.parse(localStorage.getItem("carrito"));
    return total = ls.reduce((acc, el) => acc + el.total, 0);
}

function renderizarTotalDeProductos() {
    const total = sumarTotalDelCarrito()

    const contenedorTotal = document.getElementById("mostrarTotal");
    contenedorTotal.innerHTML = "";

    const cartelTotal = document.createElement("div");
    cartelTotal.classList.add("cartel-total");

    const cifraTotal = document.createElement("h4");
    cifraTotal.classList.add("cifra-total");
    cifraTotal.innerHTML = `<span>Total: </span> $${mostrarNumeroConComas(total)}`;

    cartelTotal.append(cifraTotal);
    contenedorTotal.append(cartelTotal);
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

    const numerito = document.createElement("p");
    numerito.className = "numero-carrito";
    numerito.innerText = totalCantidad; // Muestra el total de la cantidad de productos

    if (totalCantidad !== 0) {
        numeroDeProductos.append(numerito);
    }

}

let carrito = [];

obtenerProductosDeLocalStorage()
renderizarTablaCarrito(carrito)
ocultarHtml("MensajeCarrito");


