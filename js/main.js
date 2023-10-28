let productos = [];

fetch('./js/productos.json')
    .then( response => response.json() )
    .then( data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector('#contenedorProductos');
const botonesCategorias = document.querySelectorAll('.botonCategoria');
const tituloPrincipal = document.querySelector('#tituloPrincipal');
let botonesAgregar = document.querySelectorAll('.productoAgregar');
const numeroCarrito = document.querySelector('#numeroCarrito');

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productosEnCarrito")


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}

function cargarProductos(productosElegidos) {
    
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach( producto => {

        const div = document.createElement("div");
        div.classList.add('producto');
        div.innerHTML = `
        <img id="${producto.id}" class="productoImagen" src="${producto.imagen}" alt="${producto.altDesc}">
        <div class="stock">
            <p class="stockStatus">${producto.stock}</p>
        </div>
        <div class="productoDetalles">
            <h3 class="productoTitulo">${producto.titulo}</h3>
            <div class="containerPrecio">
            <p class="productoPrecio ${producto.descuento}">$${producto.descontado}</p>
            <p class="productoPrecio ${producto.descuentoCSS}">$${producto.precio}</p>
            </div>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        </div>
        `
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
};

botonesCategorias.forEach( boton => {

    boton.addEventListener("click", (evt) => {
        botonesCategorias.forEach( boton => { boton.classList.remove("active") });
        evt.currentTarget.classList.add("active");

        if ( evt.currentTarget.id != "todos") {
            const productoCategoria = productos.find( producto => producto.categoria.id === evt.currentTarget.id );
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter( producto => producto.categoria.id === evt.currentTarget.id );
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });

});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.productoAgregar');

    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

function agregarAlCarrito(evt) {
    const idBoton = evt.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton );

    if (productoAgregado.stock === "SIN STOCK") {

        Toastify({
            text: "No Queda Stock!",
            duration: 2500,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,
            style: { background: "linear-gradient(to right, #ff0000, #19191f)" },
        }).showToast();

    } else {

        if (productosEnCarrito.some( producto => producto.id === idBoton )) {
            const productoIndex = productosEnCarrito.findIndex( producto => producto.id === idBoton );
            productosEnCarrito[productoIndex].cantidad += 1;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
    
        actualizarNumeroCarrito();
    
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    
        Toastify({
            text: "Agregado al Carrito",
            duration: 2500,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,
            style: { background: "#0EB1D2" },
        }).showToast();
    }
};

function actualizarNumeroCarrito() {
    let numeroCarro = productosEnCarrito.reduce( (acumulador, producto) => acumulador + producto.cantidad, 0 );
    numeroCarrito.innerText = numeroCarro;
};
