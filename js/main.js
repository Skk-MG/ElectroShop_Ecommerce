const productos = [
    // Ribas
    {
        id: "ribas-01",
        titulo: "Riba 01",
        imagen: "./assets/ribas/01.png",
        categoria: {
            nombre: "Ribas",
            id: "ribas"
        },
        precio: 1000
    },
    {
        id: "ribas-02",
        titulo: "Riba 02",
        imagen: "./assets/ribas/02.png",
        categoria: {
            nombre: "Ribas",
            id: "ribas"
        },
        precio: 1000
    },
    {
        id: "ribas-03",
        titulo: "Riba 03",
        imagen: "./assets/ribas/03.png",
        categoria: {
            nombre: "Ribas",
            id: "ribas"
        },
        precio: 1000
    },
    {
        id: "ribas-04",
        titulo: "Riba 04",
        imagen: "./assets/ribas/04.png",
        categoria: {
            nombre: "Ribas",
            id: "ribas"
        },
        precio: 1000
    },

    // Ribeys
    {
        id: "ribeys-01",
        titulo: "Ribey 01",
        imagen: "./assets/ribeys/01.png",
        categoria: {
            nombre: "Ribeys",
            id: "ribeys"
        },
        precio: 2000
    },
    {
        id: "ribeys-02",
        titulo: "Ribey 02",
        imagen: "./assets/ribeys/02.png",
        categoria: {
            nombre: "Ribeys",
            id: "ribeys"
        },
        precio: 2000
    },
    {
        id: "ribeys-03",
        titulo: "Ribey 03",
        imagen: "./assets/ribeys/03.png",
        categoria: {
            nombre: "Ribeys",
            id: "ribeys"
        },
        precio: 2000
    },
    {
        id: "ribeys-04",
        titulo: "Ribey 04",
        imagen: "./assets/ribeys/04.png",
        categoria: {
            nombre: "Ribeys",
            id: "ribeys"
        },
        precio: 2000
    },

    // Ribs
    {
        id: "ribs-01",
        titulo: "Rib 01",
        imagen: "./assets/ribs/01.png",
        categoria: {
            nombre: "Ribs",
            id: "ribs"
        },
        precio: 3000
    },
    {
        id: "ribs-02",
        titulo: "Rib 02",
        imagen: "./assets/ribs/02.png",
        categoria: {
            nombre: "Ribs",
            id: "ribs"
        },
        precio: 3000
    },
    {
        id: "ribs-03",
        titulo: "Rib 03",
        imagen: "./assets/ribs/03.png",
        categoria: {
            nombre: "Ribs",
            id: "ribs"
        },
        precio: 3000
    },
    {
        id: "ribs-04",
        titulo: "Rib 04",
        imagen: "./assets/ribs/04.png",
        categoria: {
            nombre: "Ribs",
            id: "ribs"
        },
        precio: 3000
    }
];

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
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
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
};

cargarProductos(productos);

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
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach( boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

function agregarAlCarrito(evt) {
    const idBoton = evt.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton );

    if (productosEnCarrito.some( producto => producto.id === idBoton )) {
        const productoIndex = productosEnCarrito.findIndex( producto => producto.id === idBoton );
        productosEnCarrito[productoIndex].cantidad += 1;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumeroCarrito() {
    let numeroCarro = productosEnCarrito.reduce( (acumulador, producto) => acumulador + producto.cantidad, 0 );
    numeroCarrito.innerText = numeroCarro;
};