    fetch('listadoProductos.json')
        .then(response => response.json())
        .then(ProductosCarrito => {

            /* ==========================TARJETA DE PRODUCTOS========================================= */
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

                    let { nombre, precio, rutaImagen } = producto
                    tarjetaProducto.innerHTML = `
    <h3> ${nombre} </h3>
<img src=./assets/${rutaImagen} />
<h4> Precio: ${precio}</h4>
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
                let carrito = []
                let carritoLS = JSON.parse(localStorage.getItem("carrito"))
                if (carritoLS) {
                    carrito = carritoLS
                }
                return carrito
            }
            /* ===========================AGREGAR AL CARRITO======================================== */
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
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });

                }

                localStorage.setItem("carrito", JSON.stringify(carrito))
                renderizarCarrito(carrito)
            }


            function renderizarCarrito() {
                let carrito = obtenerCarritoLS()
                let contenedorCarrito = document.getElementById("contenedorCarrito")
                contenedorCarrito.innerHTML = ""
                carrito.forEach(({ nombre, precioUnitario, unidades, subtotal, id }) => {
                    let tarjetaProductoCarrito = document.createElement("div")
                    tarjetaProductoCarrito.className = "tarjetaProductoCarrito"

                    tarjetaProductoCarrito.innerHTML = `
            
            <p>${nombre}</p>
            <p>${precioUnitario}</p>
            <p>${unidades}</p>
            <p>${subtotal}</p>
            <button class="btnEliminar" id=eliminar${id}>ELIMINAR</button>
        `
                    contenedorCarrito.appendChild(tarjetaProductoCarrito)
                    const botonEliminarDelCarrito = tarjetaProductoCarrito.querySelector(".btnEliminar")
                    botonEliminarDelCarrito.addEventListener('click', () => eliminarProductoCarrito(id))
                })
            }

            /* ============================== FINALIZAR COMPRA ==================================== */
            function finalizarCompra() {
                let carrito = obtenerCarritoLS()
                carrito.forEach(productoDelCarrito => {
                    let productoBuscado = ProductosCarrito.find(producto => producto.id === productoDelCarrito.id)
                    productoBuscado.stock = productoBuscado.stock - productoDelCarrito.unidades
                })
                localStorage.removeItem("carrito")
                let contenedorProductos = document.getElementById("contenedorProductos")
                contenedorProductos.innerHTML = ""

                crearTarjetasDeProductos(ProductosCarrito)


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Muchas gracias por su compra",
                    showConfirmButton: false,
                    timer: 1500
                });

                renderizarCarrito([])
            }
            /* ============================== ELIMINAR ITEM ==================================== */
            function eliminarProductoCarrito(id) {
                let carrito = obtenerCarritoLS()
                let productosQueQuedan = carrito.filter(producto => producto.id !== id)
                localStorage.setItem("carrito", JSON.stringify(productosQueQuedan))
                let contenedorCarrito = document.getElementById("contenedorCarrito")
                contenedorCarrito.innerHTML = ""
                renderizarCarrito()
            }
        })
