// Funciones
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
        nombreProducto.className = "tabla-productos__texto";
        nombreProducto.innerText = productoCarrito.nombre;

        const precioProducto = document.createElement("p");
        precioProducto.className = "tabla-productos__texto";
        precioProducto.innerText = `$${productoCarrito.precio}`;

        const cantidadProducto = document.createElement("p");
        cantidadProducto.className = "tabla-productos__texto";
        cantidadProducto.innerText = productoCarrito.cantidad;

        const totalPorProducto = document.createElement("p");
        totalPorProducto.className = "tabla-productos__texto";
        totalPorProducto.innerText = `$${productoCarrito.total}`;

        const quitarProducto = document.createElement("p");
        quitarProducto.className = "tabla-productos__texto";

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
    MensajeCarritoVacio();
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

function MensajeCarritoVacio() {
    const vacio = document.getElementById("MensajeCarrito");
    vacio.className = "mensajeCarrito";
    if (carrito.length > 0) {
        vacio.classList.add("d-none");

    } else {
        vacio.classList.remove("d-none");

    }
}

let carrito = [];

obtenerProductosDeLocalStorage()
renderizarTablaCarrito(carrito)
MensajeCarritoVacio();
