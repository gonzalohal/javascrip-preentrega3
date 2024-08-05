document.addEventListener("DOMContentLoaded", function () {
  const btnAgregarPersonalizado = document.getElementById(
    "btnAgregarPersonalizado"
  );
  const nombreProductoInput = document.getElementById("nombreProducto");
  const precioProductoInput = document.getElementById("precioProducto");
  const stockProductoInput = document.getElementById("stockProducto");
  const imagenProductoInput = document.getElementById("imagenProducto");
  const listaCarritoDiv = document.getElementById("listaCarrito");

  btnAgregarPersonalizado.addEventListener("click", () => {
    const nombreProducto = nombreProductoInput.value.trim();
    const precioProducto = precioProductoInput.value.trim();
    const stockProducto = stockProductoInput.value.trim();
    const imagenProducto = imagenProductoInput.value.trim();

    if (nombreProducto && precioProducto && stockProducto && imagenProducto) {
      agregarAlCarrito({
        nombre: nombreProducto,
        precio: precioProducto,
        stock: stockProducto,
        imagen: imagenProducto,
      });
      nombreProductoInput.value = "";
      precioProductoInput.value = "";
      stockProductoInput.value = "";
      imagenProductoInput.value = "";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ ...producto, timestamp: new Date().toISOString() });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }

  function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }

  function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    listaCarritoDiv.innerHTML = "";
    carrito.forEach((item, index) => {
      listaCarritoDiv.innerHTML += `
                <div class="item-carrito">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <p><strong>Producto:</strong> ${item.nombre}</p>
                    <p><strong>Precio:</strong> $${item.precio}</p>
                    <p><strong>Stock:</strong> ${item.stock}</p>
                    <p><strong>Agregado el:</strong> ${item.timestamp}</p>
                    <button class="btnEliminar" data-index="${index}">Eliminar</button>
                    <hr>
                </div>
            `;
    });

    document.querySelectorAll(".btnEliminar").forEach((boton) => {
      boton.addEventListener("click", () => {
        eliminarDelCarrito(boton.dataset.index);
      });
    });
  }

  mostrarCarrito();
});
