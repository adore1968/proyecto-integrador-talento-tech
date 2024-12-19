const url = 'https://fakestoreapi.com/products';
const loader = document.getElementById('loader');
const productosContainer = document.getElementById('productos-container');

const reviews = [
  {
    nombre: 'Carlos M.',
    texto:
      'Este producto ha superado mis expectativas. La calidad es excelente y funciona de manera impecable. Además, la atención al cliente fue muy rápida y resolutiva. Lo recomiendo a todos los que estén buscando algo fiable y de buena calidad. Sin duda, haré más compras en el futuro.',
    rating: 5,
  },
  {
    nombre: 'Ana P.',
    texto:
      'Muy contenta con la compra. El producto llegó a tiempo y bien embalado. Me sorprendió lo fácil que es de usar y cómo ha mejorado la eficiencia de mi trabajo. Aunque el precio es un poco alto, siento que ha valido la pena cada centavo. Definitivamente lo volveré a comprar.',
    rating: 4,
  },
  {
    nombre: 'Juan L.',
    texto:
      'No estoy completamente satisfecho con el producto. Aunque cumple con lo que promete, la durabilidad no ha sido tan buena como esperaba. Después de un par de semanas de uso, empezó a mostrar señales de desgaste. El servicio de atención al cliente fue útil, pero no pude conseguir una solución ideal.',
    rating: 3,
  },
  {
    nombre: 'Elena V.',
    texto:
      'Lo recomiendo totalmente. La calidad es excepcional y la facilidad de uso es sorprendente. Usarlo me ha ahorrado mucho tiempo y esfuerzo, y es perfecto para lo que necesitaba. La entrega fue rápida y el paquete llegó en perfectas condiciones. Estoy muy satisfecha con mi compra.',
    rating: 5,
  },
  {
    nombre: 'Ricardo F.',
    texto:
      'La relación calidad-precio es bastante buena. El producto funciona correctamente, aunque no es tan avanzado como otros modelos del mercado. Aún así, es una excelente opción si no se busca gastar mucho dinero. El envío fue puntual y el proceso de compra fue fácil y rápido.',
    rating: 4,
  },
  {
    nombre: 'Lucía G.',
    texto:
      'No me gustó el producto tanto como esperaba. Aunque las características eran prometedoras, encontré que la calidad no es tan alta como se describe. La experiencia de compra fue buena, pero no me convenció del todo el rendimiento del producto en el día a día. Aún así, no lo considero una mala compra, solo que esperaba algo mejor.',
    rating: 2,
  },
];
const reviewsContainer = document.getElementById('reviews-container');

const formContacto = document.getElementById('contacto-form');
const inputs = formContacto.querySelectorAll('input, textarea');

const mostrarMensaje = (mensaje) => {
  const mensajeDiv = document.createElement('div');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.className = 'mensaje-toast';
  document.body.appendChild(mensajeDiv);

  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000);
};

const agregarAlCarrito = (e, productos) => {
  const id = e.target.getAttribute('data-id');
  const producto = productos.find((producto) => producto.id == id);
  const localProductos = JSON.parse(localStorage.getItem('productos')) || [];
  localProductos.push({ ...producto, cantidad: 1 });
  localStorage.setItem('productos', JSON.stringify(localProductos));
  mostrarMensaje('Producto correctamente agregado al carrito!');
};

const mostrarProductos = (productos) => {
  const arrHTML = productos
    .map((producto) => {
      return `
       <div class="producto-card">
        <img src="${producto.image}" alt="${producto.title}" loading="lazy">
        <h2>${producto.title}</h2>
        <p class="price">$${producto.price.toFixed(2)}</p>
        <p>${producto.description}</p>
        <p>Rating: ${producto.rating.rate} (${
        producto.rating.count
      } reviews)</p>
        <p><strong>Categoría:</strong> ${producto.category}</p>
        <button type="button" class="boton agregar-al-carrito" data-id="${
          producto.id
        }">Agregar al carrito</button>
      </div>`;
    })
    .join('');
  productosContainer.innerHTML = arrHTML;

  const botonAgregarAlCarrito = document.querySelectorAll(
    '.agregar-al-carrito'
  );

  botonAgregarAlCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      agregarAlCarrito(e, productos);
    });
  });
};

const getProductos = async () => {
  try {
    loader.style.display = 'block';
    const res = await fetch(url);
    if (!res.ok) {
      productosContainer.innerHTML =
        '<p class="mensaje-error">Error al obtener los datos</p>';
      return;
    }
    const data = await res.json();
    mostrarProductos(data);
  } catch (error) {
    console.log(error);
    productosContainer.innerHTML = `<p class="mensaje-error">${error.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
};

const mostrarReviews = () => {
  const arrHTML = reviews
    .map((review) => {
      return `<div class="review">
    <h3>${review.nombre}</h3>
    <p>Calificacion: <span>${'★'.repeat(review.rating)}${'☆'.repeat(
        5 - review.rating
      )}</span></p>
    <p>${review.texto}</p>
    </div>`;
    })
    .join('');
  reviewsContainer.innerHTML = arrHTML;
};

const verificarCampos = (e) => {
  e.preventDefault();
  let estanCompletos = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      estanCompletos = false;
    }
  });

  if (estanCompletos) {
    console.log('Todos los campos están completos.');
  } else {
    console.log('Por favor, completa todos los campos del formulario.');
  }
};

getProductos();
mostrarReviews();

formContacto.addEventListener('submit', verificarCampos);
