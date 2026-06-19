import { useEffect, useState } from 'react';
import api from '../services/api';

function MasVendidos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerMasVendidos();
  }, []);

  const obtenerMasVendidos = async () => {
    try {
      const token = localStorage.getItem('token');

      const respuesta = await api.get('/reportes/mas-vendidos', {
        headers: {
          Authorization: token
        }
      });

      setProductos(respuesta.data);
    } catch (error) {
      setProductos([]);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-center mb-4">🏆 Productos Más Vendidos</h2>

      {productos.length === 0 ? (
        <div className="alert alert-warning">
          Aún no hay productos vendidos
        </div>
      ) : (
        <div className="row">
          {productos.map((item, index) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h4>#{index + 1}</h4>
                  <p>ID Producto: {item._id}</p>
                  <p>Cantidad vendida: {item.totalVendido}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MasVendidos;
