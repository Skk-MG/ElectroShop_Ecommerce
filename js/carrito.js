let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('#carritoVacio');
const contenedorCarritoProductos = document.querySelector('#carritoProductos');
const contenedorCarritoAcciones = document.querySelector('#carritoAcciones');
const contenedorCarritoComprado = document.querySelector('#carritoAccionesComprado');
const contenedorTotal = document.querySelector('#total');

let botonesEliminar = document.querySelectorAll('.carritoProductoEliminar');
const botonVaciarCarrito = document.querySelector('.carritoAccionesVaciar');
const botonComprar = document.querySelector('#carritoAccionesComprar');


function cargarProductosCarrito() {
    
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach ( producto => {
            const div = document.createElement('div');
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.altDesc}">
    
            <div class="carritoProductoTitulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
    
            <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
    
            <div class="carritoProductoPrecio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
    
            <div class="carritoProductoSubtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
    
            <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
    
            contenedorCarritoProductos.append(div);
        });
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
};

cargarProductosCarrito();
actualizarNumeroCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carritoProductoEliminar');

    botonesEliminar.forEach( boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
};

function eliminarDelCarrito(evt) {
    const idBoton = evt.currentTarget.id;
    const index = productosEnCarrito.findIndex( producto => producto.id === idBoton );
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

    actualizarNumeroCarrito();

    Toastify({
        text: "Producto Eliminado",
        duration: 2500,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: { background:  "linear-gradient(to right, #ff0000, #19191f)" }
    }).showToast();
};

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: 'Vaciar carrito?',
        icon: 'question',
        showCancelButton: true,
        background: '#19191f',
        color: '#ececec',
        confirmButtonColor: '#0EB1D2',
        cancelButtonColor: '#ff0000',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
    
            productosEnCarrito.length = 0;
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

            cargarProductosCarrito();
            actualizarNumeroCarrito();

        Swal.fire({
            title: 'Carrito vaciado',
            icon: 'success',
            background: '#19191f',
            color: '#ececec',
            toast: true,
            timer: 1500,
            showConfirmButton: false
          })
        }
    })
};


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce( (acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;

    actualizarNumeroCarrito();
};

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        title: 'Finalizar compra?',
        icon: 'question',
        showCancelButton: true,
        background: '#19191f',
        color: '#ececec',
        confirmButtonColor: '#0EB1D2',
        cancelButtonColor: '#ff0000',
        confirmButtonText: 'Hecho',
        cancelButtonText: 'Cancelar'
    
      }).then((result) => {
        if (result.isConfirmed) {
    
            productosEnCarrito.length = 0;
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
            
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        
            actualizarNumeroCarrito();
    
            Swal.fire({
                title: 'Gracias por tu compra!',
                icon: 'success',
                background: '#19191f',
                color: '#ececec',
                toast: true,
                timer: 1500,
                showConfirmButton: false
            })
        }
    })
};


function actualizarNumeroCarrito() {
    let numeroCarro = productosEnCarrito.reduce( (acumulador, producto) => acumulador + producto.cantidad, 0 );
    numeroCarrito.innerText = numeroCarro;
};