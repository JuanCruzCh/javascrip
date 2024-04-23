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
    {  id: 1, nombre: "Disco", categoria : "Frenos", stock: 5, precio: 8000, },

    {  id: 2, nombre: "Pastilla Delantera", categoria: "Frenos", stock: 4, precio: 4500,},

    {  id: 3, nombre: "Amortiguador", categoria: "Tren Delantero", stock: 4, precio: 11500, },

    {  id: 4, nombre: "Bieleta", categoria:  "Tren Delantero", stock: 3, precio: 3000, },

    {  id: 5, nombre: "Bujia", categoria: "Motor", stock: 15, precio: 1500,},

    {  id: 6, nombre: "Bobina", categoria: "Motor", stock: 10, precio: 3500, },
]


function Buscador(){
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

 function AgregarAlCarrito(nombre, precio, total) {
    var cantidad = Number(prompt("Ingrese una cantidad"))
    var subtotal = precio * cantidad
    total = total + subtotal
    alert("se agrego " + nombre + "  por un valor de " + subtotal)
    return total 
}