import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 

const HomeView = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido al CRUD de productos y usuarios</h1>
      <h4>(aplicación fullstack en JavaScript donde el frontend (React) consume los datos expuestos por el backend (Express), permitiendo realizar CRUDs completos)</h4>
      <div>
        <Link to="/usuarios">
          <Button label="Ir a Usuarios" />
        </Link>

        <Link to="/productos">
          <Button label="Ir a Productos" />
        </Link>
      </div>
    </div>
  );
};

export default HomeView;
