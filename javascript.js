let ProductosCarrito = [
    { id: 1, nombre: "Disco", categoria: "Frenos", stock: 5, precio: 8000, rutaImagen: "discodefreno.jpg" },

    { id: 2, nombre: "Pastilla Delantera", categoria: "Frenos", stock: 4, precio: 4500, rutaImagen: "pastillasdefreno.webp" },

    { id: 3, nombre: "Amortiguador", categoria: "Tren Delantero", stock: 4, precio: 11500, rutaImagen: "amortiguador.jpeg" },

    { id: 4, nombre: "Bieleta", categoria: "Tren Delantero", stock: 3, precio: 3000, rutaImagen: "bieleta.webp" },

    { id: 5, nombre: "Bujia", categoria: "Motor", stock: 15, precio: 1500, rutaImagen: "bujias.jpg" },

    { id: 6, nombre: "Bobina", categoria: "Motor", stock: 10, precio: 3500, rutaImagen: "bobina.jpeg" },
]

/* =================================================================== */
function crearTarjetasDeProductos(productos) {
    let contenedorProductos = document.getElementById("contenedorProductos")
let carrito = obtenerCarritoLS()
renderizarCarrito()



    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("p")
         let mensaje
        if (producto.stock > 3) {
            tarjetaProducto.className = "tarjetaProducto"
            mensaje = "Unidades restantes " + producto.stock
        } else {
            tarjetaProducto.className = "pocosProductos"
            mensaje = "Pocas Unidades"
        }


        tarjetaProducto.innerHTML = `
    <h3> ${producto.nombre} </h3>
<img src=./assets/${producto.rutaImagen} />
<h4> Precio: ${producto.precio}</h4>
<p> ${mensaje} </p>
<button class="btnAgregar" id=${producto.id} >Agregar al carrito</button>
    `
        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => AgregarAlCarrito(e, productos, carrito))
    });
   let botonComprar = document.getElementById("botonComprar")
   botonComprar.addEventListener("click", finalizarCompra)
}

function obtenerCarritoLS() {
    let carrito= []
    let carritoLS = JSON.parse(localStorage.getItem("carrito"))
if (carritoLS) {
    carrito = carritoLS
}
return carrito
}

crearTarjetasDeProductos(ProductosCarrito)

function AgregarAlCarrito(e, productos) {
    let carrito = obtenerCarritoLS()
    let idDelProducto = Number(e.target.id)
    console.log(idDelProducto)

    let posProductoEnCarrito = carrito.findIndex(producto => producto.id === idDelProducto)
    let productoBuscado = productos.find(producto => producto.id === idDelProducto)

    if (posProductoEnCarrito !== -1) {
        carrito[posProductoEnCarrito].unidades++
        carrito[posProductoEnCarrito].subtotal = carrito[posProductoEnCarrito].precioUnitario * carrito[posProductoEnCarrito].unidades
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}


function renderizarCarrito() {
    let carrito = obtenerCarritoLS()
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.className = "tarjetaProductoCarrito"

        tarjetaProductoCarrito.innerHTML = `
            
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
            <button class="btnEliminar" id=eliminar${producto.id}>ELIMINAR</button>
        `
        contenedorCarrito.appendChild(tarjetaProductoCarrito)
    })
}


function finalizarCompra() {
    localStorage.removeItem("carrito")
renderizarCarrito([])
}

