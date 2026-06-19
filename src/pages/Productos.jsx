import { useEffect, useState } from 'react';
import api from '../services/api';

function Productos({ refrescarCarrito, logueado, setMostrarLogin, actualizarProductos }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  useEffect(() => {
    obtenerProductos();
  }, [actualizarProductos]);

  const obtenerProductos = async () => {
    try {
      const respuesta = await api.get('/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarCarrito = async (productoId) => {
	if (!logueado) {
	  alert('Primero inicia sesión o regístrate');
 	  setMostrarLogin(true);
 	  window.scrollTo({ top: 0, behavior: 'smooth' });
 	  return;
	}
    try {
      const token = localStorage.getItem('token');

      await api.post(
        '/carrito/agregar',
        { productoId, cantidad: 1 },
        { headers: { Authorization: token } }
      );

      alert('Producto agregado al carrito');
      refrescarCarrito();

    } catch (error) {
      alert('Debe iniciar sesión');
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === 'Todos' || producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div>
      <h2 className="mb-4 text-center">Productos</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="mb-4 text-center">
        {['Todos', 'Laptops', 'Periféricos', 'Audio', 'Monitores'].map((cat) => (
          <button
            key={cat}
            className={
              categoria === cat
                ? 'btn btn-primary m-1'
                : 'btn btn-outline-primary m-1'
            }
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {productosFiltrados.map((producto) => (
          <div className="col-md-4 mb-4" key={producto._id}>
            <div className="card shadow-sm h-100">

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="card-img-top"
                style={{
                  height: '200px',
                  objectFit: 'cover'
                }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{producto.nombre}</h5>

                <span className="badge bg-secondary mb-2">
                  {producto.categoria}
                </span>

                <p className="card-text mt-2">
                  <strong>Precio:</strong> S/ {producto.precio}
                </p>

                <p className="card-text">
                  <strong>Stock:</strong> {producto.stock}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => agregarCarrito(producto._id)}
                >
                  Agregar al carrito
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
