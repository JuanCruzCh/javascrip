/*function Repuestos() {
    var opcion
    var total = 0

    do {
        opcion = Number(prompt("Ingrese un repuesto \n1 Embrague \n2 Discos \n3 Pastillas de freno \n4 Bujias \n0 salir"))
        if (opcion === 1) {
            total = AgregarAlCarrito("Embrague ", 5000, total)
        }
        else if (opcion === 2) {
            total = AgregarAlCarrito("Discos ", 2300, total)
        } else if (opcion === 3) {
            total = AgregarAlCarrito("Pastilla de freno ", 500, total)
        } else if (opcion === 4) {
            total = AgregarAlCarrito("Bujias ", 250, total)
        }
    } while (opcion !== 0);
    alert("El total de su compra es de " + total + " en efectivo ")
}


function AgregarAlCarrito(repuesto, PrecioPorUnidad, total) {
    var cantidad = Number(prompt("Ingrese una cantidad"))
    var subtotal = PrecioPorUnidad * cantidad
    total = total + subtotal
    alert("se agrego " + repuesto + "  por un valor de " + subtotal)
    return total 
}

Repuestos()*/


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
let carrito = []


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
<btn class="btnAgregar" id=${producto.id} >Agregar al carrito</btn>
    `
        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => AgregarAlCarrito(e, productos, carrito))
    });

}
crearTarjetasDeProductos(ProductosCarrito)



function AgregarAlCarrito(e, productos, carrito) {
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

    console.log(carrito)
    renderizarCarrito(carrito)
}


function renderizarCarrito(carrito) {
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
            <button id=eliminar${producto.id}>ELIMINAR</button>
        `
        contenedorCarrito.appendChild(tarjetaProductoCarrito)
    })
}

/*function Buscador(){
    let total = 0
 let buscar;
 do{ 
    buscar  =Number(prompt('\n1 Seleccionar categoria \n2 Buscar producto \n0 Ir a pagar'))
 if(buscar === 1){
       total= BuscarPorCategoria(total)
    } else if(buscar === 2)
    {
      total = BuscarPorProducto(total)  
}
} while(buscar !==0)
alert('El total de su compra es de ' + total + ' en efectivo')
}
Buscador()

// Buscar por categoria
function BuscarPorCategoria(total){
let categoriaProducto = prompt('Ingrese una categoria para buscar')?.toLowerCase()
if (categoriaProducto){
let FiltroDeCategoria = ProductosCarrito.filter(Producto => Producto.categoria.toLowerCase().includes(categoriaProducto))

let listaDeCategorias ='' 
FiltroDeCategoria.forEach((categoria, index) => {
    listaDeCategorias += `\n${index} ${categoria.nombre }`
} )
let indiceDeProducto = prompt(listaDeCategorias);
if (indiceDeProducto <= FiltroDeCategoria.length) {
   const producto = FiltroDeCategoria [indiceDeProducto]
    return AgregarAlCarrito(producto.nombre, producto.precio, total)
}
}
}
// Buscar por producto
 function BuscarPorProducto(total) {
    let nombreProducto = prompt('ingrese nombre del producto')
    let buscarProducto = ProductosCarrito.find(producto => producto.nombre.toLowerCase().includes(nombreProducto))
if(buscarProducto){ 
   return AgregarAlCarrito(buscarProducto.nombre, buscarProducto.precio, total)
}
 }

 
*/

