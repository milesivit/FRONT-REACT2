import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 
import { AuthContext } from '../../context/AuthContext'
import { useContext, UseContext } from 'react'
const HomeView = () => {
  const {user, logout} = useContext(AuthContext)
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido al CRUD de productos y usuarios</h1>
      <h4>(aplicación fullstack en JavaScript donde el frontend (React) consume los datos expuestos por el backend (Express), permitiendo realizar CRUDs completos)</h4>
      {user ? 
        <div>
        <Link to="/usuarios">
          <Button label="Ir a Usuarios" />
        </Link>

        <Link to="/productos">
          <Button label="Ir a Productos" />
        </Link>

        <Button label='cerrar sesion' onClick={logout}></Button>
        </div>
      : <div>
      <Link to="/registro">
        <Button label="Registrarse" />
      </Link>

      <Link to="/inicio-sesion">
        <Button label="inicio sesion" />
      </Link>
    </div>}
      
    </div>
  );
};

export default HomeView;
