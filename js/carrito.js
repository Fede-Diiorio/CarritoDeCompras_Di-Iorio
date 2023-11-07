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

obtenerProductosDeLocalStorage()
renderizarTablaCarrito(carrito)