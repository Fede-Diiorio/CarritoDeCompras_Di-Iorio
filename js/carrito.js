// Funciones
function renderizarTablaCarrito(productosCarrito) {

    const tbody = document.querySelector("#carrito table tbody");
    tbody.innerHTML = "";

    for (const productoCarrito of productosCarrito) {

        const tr = document.createElement("tr");
        tr.className = "tr";

        const tdNombre = document.createElement("td");
        tdNombre.className = "td";
        tdNombre.innerText = productoCarrito.nombre;


        const tdPrecio = document.createElement("td");
        tdPrecio.className = "td";
        tdPrecio.innerText = `$${productoCarrito.precio}`;


        const tdCantidad = document.createElement("td");
        tdCantidad.className = "td";
        tdCantidad.innerText = productoCarrito.cantidad;


        const tdTotalPorProducto = document.createElement("td");
        tdTotalPorProducto.className = "td";
        tdTotalPorProducto.innerText = `$${productoCarrito.total}`;

        const tdEliminar = document.createElement("td");
        tdEliminar.className = "td";

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.innerText = "X";

        // Agregar evento al boton
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(productoCarrito);
        });

        // Agregar elementos uno adentro de otro
        tdEliminar.append(botonEliminar);
        tr.append(tdNombre, tdPrecio, tdCantidad, tdTotalPorProducto, tdEliminar);

        tbody.append(tr);
    }
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

let carrito = [];

obtenerProductosDeLocalStorage()
renderizarTablaCarrito(carrito)