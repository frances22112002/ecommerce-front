import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import MisPedidos from './pages/MisPedidos';
import MasVendidos from './pages/MasVendidos';

function App() {
  const [actualizarCarrito, setActualizarCarrito] = useState(0);
  const [actualizarPedidos, setActualizarPedidos] = useState(0);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [logueado, setLogueado] = useState(!!localStorage.getItem('token'));
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [actualizarProductos, setActualizarProductos] = useState(0);

  const refrescarProductos = () => {
    setActualizarProductos(actualizarProductos + 1);
  };

  const refrescarCarrito = () => {
    setActualizarCarrito(actualizarCarrito + 1);
  };

  const refrescarPedidos = () => {
    setActualizarPedidos(actualizarPedidos + 1);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setLogueado(false);
    setMostrarLogin(false);
    setCantidadCarrito(0);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">
            🛒 TechStore
          </span>

          <div>
            {logueado ? (
              <>
                <span className="badge bg-warning text-dark fs-6 me-2">
                  Carrito: {cantidadCarrito}
                </span>

                <button className="btn btn-light btn-sm" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                className="btn btn-light btn-sm"
                onClick={() => setMostrarLogin(true)}
              >
                Iniciar sesión / Registrarse
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
          <h1 className="display-5 fw-bold">Ofertas en Tecnología</h1>
          <p className="fs-5">
            Encuentra laptops, periféricos, audio y monitores al mejor precio.
          </p>
          <span className="badge bg-danger fs-6">
            Envíos rápidos y stock disponible
          </span>
        </div>

        {!logueado && mostrarLogin && (
          <>
            <Login setLogueado={setLogueado} />
            <hr />
          </>
        )}

        <MasVendidos />

        <hr />

        <Productos
          refrescarCarrito={refrescarCarrito}
          logueado={logueado}
          setMostrarLogin={setMostrarLogin}
          actualizarProductos={actualizarProductos}
        />

        {logueado && (
          <>
            <hr />

            <Carrito
              actualizarCarrito={actualizarCarrito}
              setCantidadCarrito={setCantidadCarrito}
              refrescarPedidos={refrescarPedidos}
              refrescarProductos={refrescarProductos}
            />

            <hr />

            <MisPedidos actualizarPedidos={actualizarPedidos} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
