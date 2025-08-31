import { useProductContext } from '../../context/ProductContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProductsView() {
  const { products, deleteProduct, loading, error } = useProductContext();
  const { user } = useContext(AuthContext);

  const handleExport = () => {
    exportToPDF(products, 'Productos', ['nombre', 'precio']);
  };

  return (
    <div>
      <Navbar />
      <h2>📦 Lista de Productos 📦</h2>
      {user?.role === "admin" && (
        <Link to="/productos/crear">
          <Button label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>
      )}
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={Array.isArray(products) ? products : []} paginator={false} className="p-datatable-sm p-shadow-2 mt-4">
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />
        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              {user?.role === "admin" && (
                <>
                  <Link to={`/productos/editar/${rowData.id}`}>
                    <Button 
                      label="Editar" 
                      icon="pi pi-pencil" 
                      className="p-button-rounded p-button-info mr-2" 
                    />
                  </Link>
                  <Button 
                    label="Eliminar" 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger" 
                    onClick={() => deleteProduct(rowData.id)} 
                  />
                </>
              )}
            </>
          )}
        />
      </DataTable>
    </div>
  );
}
