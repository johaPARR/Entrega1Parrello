// ==========================================
// Simulador interactivo: ARAPERFUL
// Entrega 2 - Curso JavaScript
// Enfoque: DOM, Eventos y Storage
// ==========================================

// 1. Clase para estandarizar productos
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// 2. Base de datos de productos
const productos = [
    new Producto(1, "Perfume", 12000),
    new Producto(2, "Crema corporal", 4500),
    new Producto(3, "Jabón artesanal", 2500)
];

// 3. Inicialización del carrito (Uso de Storage y JSON)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 4. Captura de elementos del DOM
const contenedorProds = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalPrecio = document.getElementById("total-precio");
const btnVaciar = document.getElementById("btn-vaciar");
const btnFinalizar = document.getElementById("btn-finalizar");
const mensajeBienvenida = document.getElementById("descripcion");
const btnPagar = document.getElementById("btn-pagar");
const divOpcionesPago = document.getElementById("opciones-pago");
const btnConfirmarPago = document.getElementById("btn-confirmar-pago");

// 5. FUNCIONES

// Función para mostrar los productos en la página
function mostrarProductos() {
    contenedorProds.innerHTML = "";

    productos.forEach(prod => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <button id="btn-comprar-${prod.id}">Agregar</button>
        `;
        contenedorProds.appendChild(card);

        const boton = document.getElementById(`btn-comprar-${prod.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(prod.id);
        });
    });
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
    const productoSeleccionado = productos.find(p => p.id === id);
    carrito.push(productoSeleccionado);
    actualizarCarrito();
}

// Función para dibujar el carrito y sumar el total
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let acumulado = 0;

    carrito.forEach((prod) => {
        const li = document.createElement("li");
        li.innerText = `${prod.nombre} - $${prod.precio}`;
        listaCarrito.appendChild(li);
        acumulado += prod.precio;
    });

    totalPrecio.innerText = acumulado;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 6. EVENTOS DE BOTONES DE ACCIÓN

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem("carrito");
    mensajeBienvenida.innerText = "Carrito vacío. ¡Sigue comprando en Araperful!";
});

// Finalizar compra (Avisa que debe pagar)
btnFinalizar.addEventListener("click", () => {
    if (carrito.length > 0) {
        mensajeBienvenida.innerText = "¡Pedido listo! Por favor, selecciona el botón Pagar debajo.";
    } else {
        mensajeBienvenida.innerText = "El carrito está vacío.";
    }
});

// Mostrar opciones de pago
btnPagar.addEventListener("click", () => {
    if (carrito.length > 0) {
        divOpcionesPago.style.display = "block";
        btnPagar.style.display = "none";
    } else {
        mensajeBienvenida.innerText = "El carrito está vacío.";
    }
});

// Confirmar el pago final
btnConfirmarPago.addEventListener("click", () => {
    const seleccion = document.querySelector('input[name="metodo"]:checked');

    if (seleccion) {
        const metodo = seleccion.value;
        const totalActual = totalPrecio.innerText;

        // Limpieza de datos
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito(); // Ahora el nombre coincide con la función

        // Reset de interfaz
        divOpcionesPago.style.display = "none";
        btnPagar.style.display = "inline-block";
        seleccion.checked = false;

        // Feedback visual
        mensajeBienvenida.style.color = "green";
        mensajeBienvenida.style.fontWeight = "bold";
        mensajeBienvenida.innerText = `¡Pago exitoso con ${metodo}! Total: $${totalActual}. ¡Gracias por tu compra!`;

        // Volver al estado normal después de 5 segundos
        setTimeout(() => {
            mensajeBienvenida.style.color = "#7b1fa2";
            mensajeBienvenida.style.fontWeight = "normal";
            mensajeBienvenida.innerText = "Bienvenido a Araperful. Selecciona los productos que desees agregar al carrito.";
        }, 5000);

    } else {
        mensajeBienvenida.style.color = "red";
        mensajeBienvenida.innerText = "Por favor, selecciona un método de pago.";
    }
});

// 7. EJECUCIÓN INICIAL
mostrarProductos();
actualizarCarrito();