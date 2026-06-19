import { useEffect, useState } from 'react';
import api from '../services/api';

function MisPedidos({ actualizarPedidos }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    obtenerPedidos();
  }, [actualizarPedidos]);

  const obtenerPedidos = async () => {
    try {
      const token = localStorage.getItem('token');

      const respuesta = await api.get('/pedidos/mis-pedidos', {
        headers: {
          Authorization: token
        }
      });

      setPedidos(respuesta.data);

    } catch (error) {
      setPedidos([]);
    }
  };

  const colorEstado = (estado) => {
    if (estado === 'Pagado') return 'success';
    if (estado === 'Pendiente') return 'warning';
    if (estado === 'Enviado') return 'primary';
    if (estado === 'Entregado') return 'info';
    if (estado === 'Cancelado') return 'danger';
    return 'secondary';
  };

  return (
    <div>
      <h2 className="text-center mb-4">
        Mis Pedidos
      </h2>

      {pedidos.length === 0 ? (
        <div className="alert alert-warning text-center">
          Aún no tienes pedidos registrados
        </div>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => (
            <div className="col-md-6 mb-4" key={pedido._id}>
              <div className="card shadow-sm h-100">
                <div className="card-header bg-dark text-white">
                  Pedido #{pedido._id.slice(-6)}
                </div>

                <div className="card-body">
                  <p>
                    <strong>Total:</strong> S/ {pedido.total}
                  </p>

                  <p>
                    <strong>Estado:</strong>{' '}
                    <span className={`badge bg-${colorEstado(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                  </p>

                  <p>
                    <strong>Fecha:</strong>{' '}
                    {new Date(pedido.fecha).toLocaleDateString()}
                  </p>

                  <h6 className="mt-3">
                    Productos comprados:
                  </h6>

                  <ul className="list-group">
                    {pedido.productos.map((item) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={item._id}
                      >
                        <span>
                          {item.producto?.nombre || 'Producto no disponible'}
                        </span>

                        <span className="badge bg-primary rounded-pill">
                          x{item.cantidad}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisPedidos;

