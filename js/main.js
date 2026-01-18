// ===============================
// Simulador interactivo de compras
// Entrega 1 - Curso JavaScript
// Interacción mediante prompt, alert y confirm
// ===============================


// Mensaje de bienvenida al usuario
alert("Bienvenido/a al simulador de compras");


// Variables globales para controlar el estado del simulador
let totalCompra = 0;
let seguirComprando = true;


// Array de productos disponibles para la compra
const productos = [
  { id: 1, nombre: "Perfume", precio: 12000 },
  { id: 2, nombre: "Crema corporal", precio: 4500 },
  { id: 3, nombre: "Jabón artesanal", precio: 2500 }
];


// Función que muestra el listado de productos disponibles
function mostrarProductos() {
  let lista = "Productos disponibles:\n";

  for (let i = 0; i < productos.length; i++) {
    lista += `${productos[i].id} - ${productos[i].nombre} $${productos[i].precio}\n`;
  }

  alert(lista);
}


// Función que suma el precio del producto seleccionado al total de la compra
function agregarAlTotal(producto) {
  totalCompra += producto.precio;
}


// Función que solicita al usuario el ID del producto y lo busca en el array
function seleccionarProducto() {
  let idProducto = Number(prompt("Ingrese el ID del producto que desea comprar:"));

  // Validación: si el valor ingresado no es un número, se retorna null
  if (isNaN(idProducto)) {
    return null;
  }

  let productoEncontrado = null;

  // Búsqueda del producto dentro del array
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      productoEncontrado = productos[i];
      break;
    }
  }

  return productoEncontrado;
}


// ===============================
// Inicio del simulador de compras
// ===============================

while (seguirComprando) {
  mostrarProductos();

  let producto = seleccionarProducto();

  if (producto !== null) {
    agregarAlTotal(producto);
    alert(`Agregaste ${producto.nombre} al carrito`);
  } else {
    alert("Producto no encontrado");
  }

  seguirComprando = confirm("¿Desea agregar otro producto?");
}


// Mensaje final con el total de la compra
alert(`El total de su compra es: $${totalCompra}`);
console.log("Compra finalizada. Total:", totalCompra);
