const containerProductos = document.querySelector('.container-productos');
const total = document.querySelector('.total');
const containerCarrito = document.querySelector('.container-carrito');

const getProductos = () => {
  const productos = localStorage.getItem('productos');
  return productos ? JSON.parse(productos) : [];
};

const setProductos = (productos) => {
  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductos();
};

const eliminarProducto = (id) => {
  const productos = getProductos().filter((producto) => producto.id != id);
  setProductos(productos);
};

const actualizarCantidad = (id, newValue) => {
  const productos = getProductos();
  const producto = productos.find((p) => p.id == id);
  if (producto) {
    producto.cantidad = newValue;
    setProductos(productos);
  }
};

const mostrarProductos = () => {
  const productos = getProductos();
  let totalSuma = 0;

  if (productos.length === 0) {
    containerCarrito.style.display = 'none';
    return;
  }

  const productosHTML = productos
    .map((producto) => {
      totalSuma += producto.price * producto.cantidad;

      return `
        <tr>
          <td>${producto.title}</td>
          <td>$${producto.price.toFixed(2)}</td>
          <td>
            <input type="number" value="${
              producto.cantidad
            }" min="1" class="cantidad" data-id="${producto.id}" />
          </td>
          <td>$${(producto.price * producto.cantidad).toFixed(2)}</td>
          <td>
            <button type="button" onclick="eliminarProducto(${
              producto.id
            })">Eliminar</button>
          </td>
        </tr>
      `;
    })
    .join('');
  containerProductos.innerHTML = productosHTML;
  total.textContent = totalSuma.toFixed(2);

  const inputsCantidad = document.querySelectorAll('.cantidad');
  inputsCantidad.forEach((input) => {
    input.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const newValue = parseInt(e.target.value);
      actualizarCantidad(id, newValue);
    });
  });
};

document.addEventListener('DOMContentLoaded', mostrarProductos);
