// Use const porque el array es una lista fija que no reemplazaremos por otra.

//punto 1
const frutas = [
  { id: 1, nombre: "arandano", precio: 5000, imagen: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, imagen: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 4000, imagen: "img/frambuesa.png" },
  { id: 4, nombre: "frutilla", precio: 3000, imagen: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, imagen: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, imagen: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1500, imagen: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 9000, imagen: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, imagen: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, imagen: "img/anana.jpg" },
  {
    id: 11,
    nombre: "pomelo-amarillo",
    precio: 2000,
    imagen: "img/pomelo-amarillo.jpg",
  },
  {
    id: 12,
    nombre: "pomelo-rojo",
    precio: 2000,
    imagen: "img/pomelo-rojo.jpg",
  },
  { id: 13, nombre: "sandia", precio: 3500, imagen: "img/sandia.jpg" },
];

//punto 5 y 6
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//punto 2
const alumno = { dni: 38026899, nombre: "Fatima", apellido: "Gonzalez" };

function imprimirDatosAlumno() {
  console.log(
    `Me llamo ${alumno.nombre} ${alumno.apellido} y mi DNI es ${alumno.dni}`,
  );

  const nombreAlumno = document.querySelector(".nombreAlumno");

  nombreAlumno.textContent = `${alumno.nombre} ${alumno.apellido}`;
}

//punto 3
function mostrarProductos(unaLista) {
  // Obtengo el contenedor de las frutas del html
  const contenedorFrutas = document.querySelector(".contenedor-productos");
  // Creo una variable para cargar el contenido
  let contenido = "";
  //Recorro el array de frutas
  unaLista.forEach((producto) => {
    //Cargo el contenido con la informacion del array de frutas
    contenido += `<div class="card-producto">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>`;
  });
  /*Guardo una sola vez el contenido dentro del HTML para  
  no tener que cargar el contenedor 13 veces, 
  lo cual puede ser muy costoso para el navegador. */
  contenedorFrutas.innerHTML = contenido;
}

//punto 4
function filtroInput() {
  // Obtengo el input
  const inputFrutas = document.querySelector(".barra-busqueda");
  // Llamo al event listener para ver que tecla se apreto y que se va esribiendo en el input
  inputFrutas.addEventListener("keyup",  event => {
    // filtro comparando el nombre de las frutas con los seleccionados
    // elegi const porque la variable no se va a modificar mientras se ejecuta el filtro
    const match = frutas.filter((fruta) =>
      //pase ambos a lower case para que se comparen por igual
      fruta.nombre.toLowerCase().includes(inputFrutas.value.toLowerCase()),
    );
    //muestro los prductos que quedan con esa busqueda
    mostrarProductos(match);
  });
}

//punto 5
function agregarAlCarrito(idProducto) {
  const producto = carrito.find((item) => item.id === idProducto);

  if (producto) {
    producto.cantidad++;
  } else {
    const frutaEncontrada = frutas.find((fruta) => fruta.id === idProducto);
    const productoParaCarrito = { ...frutaEncontrada, cantidad: 1 };
    carrito.push(productoParaCarrito);
  }
  console.log("Carrito actual:", carrito);
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

function mostrarCarrito() {
  const contenedorFrutas = document.querySelector("#items-carrito");
  const contadorCarrito = document.querySelector("#contador-carrito");
  const contenedorTotalCarrito = document.querySelector("#precio-total");

  let totalProductos = 0;
  let precioTotal = 0;
  let contenido = "";

  carrito.forEach((producto) => {
    totalProductos += producto.cantidad;
    precioTotal += producto.precio * producto.cantidad;

    contenido += `<li class="bloque-item">
    <p class="nombre-item">  ${producto.nombre} - $${producto.precio}</p>
    <div class="controles-cantidad">
      <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
      <span>${producto.cantidad}</span>
      <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
    </div>
    <button class="boton-eliminar" onclick ="eliminarProducto(${producto.id})" >Eliminar</button>

    </li>`;
  });

  if (carrito.length === 0) {
  contenedorFrutas.innerHTML = `<div class="carrito-vacio">
    <img src="img/carrito-vacio.png" alt="Carrito vacío">
  </div>`;
} else {
  contenedorFrutas.innerHTML = `<ul>${contenido}</ul>       
  <button onclick="vaciarCarrito()">Vaciar carrito</button>`;
}

  contadorCarrito.textContent = totalProductos;
  contenedorTotalCarrito.textContent = `$${precioTotal}`;
}

function eliminarProducto(idProducto) {
  carrito = carrito.filter((fruta) => fruta.id !== idProducto);
  console.log("Carrito actual:", carrito);
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

//punto 6

function guardarCarritoEnLocalStorage() {
  let carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
}

//punto 7

function cambiarCantidad(idProducto, cambio) {
  const productoEnCarrito = carrito.find((item) => item.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cambio;
    if (productoEnCarrito.cantidad <= 0) {
      carrito = carrito.filter((item) => item.id !== idProducto);
    }
  }
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

//punto 8
function ordenarProductos(condicion) {
  const copia = [...frutas];

  switch (condicion) {
    case "nombre-az":
      copia.sort(compararNombres)
      break;
    case "nombre-za":
      copia.sort((a,b)=>compararNombres(b,a))
      break;
    case "precio-menor":
      copia.sort((a,b)=> a.precio - b.precio)
      break;
    case "precio-mayor":
      copia.sort((a,b)=> b.precio - a.precio)
      break;
  }
  mostrarProductos(copia);
}

function compararNombres(a, b) {
  let resultado = 0;
  if (a.nombre > b.nombre) {
    resultado = 1;
  } else if (a.nombre < b.nombre) {
    resultado = -1;
  }
  return resultado;
}

//punto 9
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

function init() {
  imprimirDatosAlumno();
  mostrarProductos(frutas);
  filtroInput();
  mostrarCarrito();
}

init();
