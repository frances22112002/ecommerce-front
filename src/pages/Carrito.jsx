import { useEffect, useState } from 'react';
import api from '../services/api';

function Carrito({ actualizarCarrito, setCantidadCarrito, refrescarPedidos, refrescarProductos }) {
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    obtenerCarrito();
  }, [actualizarCarrito]);

  const obtenerCarrito = async () => {
    try {
      const token = localStorage.getItem('token');

      const respuesta = await api.get('/carrito', {
        headers: {
          Authorization: token
        }
      });

      setCarrito(respuesta.data);

      if (respuesta.data.productos) {
        const productosValidos = respuesta.data.productos.filter(
          item => item.producto
        );

        setCantidadCarrito(productosValidos.length);
      } else {
        setCantidadCarrito(0);
      }

    } catch (error) {
      setCarrito({
        mensaje: 'Carrito vacío'
      });

      setCantidadCarrito(0);
    }
  };

  const quitarProducto = async (productoId) => {
    try {
      const token = localStorage.getItem('token');

      await api.delete(`/carrito/quitar/${productoId}`, {
        headers: {
          Authorization: token
        }
      });

      obtenerCarrito();

    } catch (error) {
      alert('Error al quitar producto');
    }
  };

  const crearPedido = async () => {
    try {
      const token = localStorage.getItem('token');

      await api.post(
        '/pedidos/crear',
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert('Compra realizada correctamente');

      obtenerCarrito();
      refrescarPedidos();
      refrescarProductos();

    } catch (error) {
      alert('Error al crear pedido');
    }
  };

  if (!carrito || carrito.mensaje || !carrito.productos) {
    return (
      <div>
        <h2 className="text-center mb-4">Carrito</h2>

        <div className="alert alert-info text-center">
          Carrito vacío
        </div>
      </div>
    );
  }

  const productosValidos = carrito.productos.filter(
    item => item.producto
  );

  const total = productosValidos.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );

  if (productosValidos.length === 0) {
    return (
      <div>
        <h2 className="text-center mb-4">Carrito</h2>

        <div className="alert alert-info text-center">
          Carrito vacío
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-4">Carrito</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {productosValidos.map((item) => (
            <tr key={item._id}>
              <td>{item.producto.nombre}</td>
              <td>S/ {item.producto.precio}</td>
              <td>{item.cantidad}</td>
              <td>S/ {item.producto.precio * item.cantidad}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => quitarProducto(item.producto._id)}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-center">
        Total: S/ {total}
      </h3>

      <div className="text-center mt-3">
        <button
          className="btn btn-success"
          onClick={crearPedido}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}

export default Carrito;
