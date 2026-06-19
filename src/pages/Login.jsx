import { useState } from 'react';
import api from '../services/api';

function Login({ setLogueado }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const respuesta = await api.post('/usuarios/login', {
        email,
        password
      });

      localStorage.setItem('token', respuesta.data.token);
      setLogueado(true);
      alert('Login correcto');

    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  const registrar = async () => {
    try {
      await api.post('/usuarios/registro', {
        nombre,
        email,
        password,
        rol: 'cliente'
      });

      alert('Usuario registrado. Ahora inicia sesión.');
      setModoRegistro(false);

    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="mb-3">
          {modoRegistro ? 'Registrarse' : 'Iniciar Sesión'}
        </h2>

        {modoRegistro && (
          <input
            className="form-control mb-2"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        )}

        <input
          className="form-control mb-2"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {modoRegistro ? (
          <button className="btn btn-success" onClick={registrar}>
            Registrarme
          </button>
        ) : (
          <button className="btn btn-primary" onClick={login}>
            Ingresar
          </button>
        )}

        <button
          className="btn btn-link"
          onClick={() => setModoRegistro(!modoRegistro)}
        >
          {modoRegistro
            ? 'Ya tengo cuenta'
            : 'No tengo cuenta, registrarme'}
        </button>
      </div>
    </div>
  );
}

export default Login;
