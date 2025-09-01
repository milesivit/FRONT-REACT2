import { useProductContext } from '../../context/ProductContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { FilterMatchMode } from 'primereact/api';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { AuthContext } from "../../context/AuthContext";

export default function ProductsView() {
  const { products, deleteProduct, loading, error } = useProductContext();
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    precio: { value: null, matchMode: FilterMatchMode.EQUALS }});

  const handleExport = () => {
    exportToPDF(products, 'Productos', ['nombre', 'precio']);
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: '¿Seguro que deseas eliminar este producto?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => deleteProduct(id)
    });
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

      <ConfirmDialog />

      <div className="p-mb-2 mt-4" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre" 
          value={filters.nombre.value || ''} 
          onChange={(e) => setFilters({
            ...filters,
            nombre: { ...filters.nombre, value: e.target.value }
          })}
          className="p-inputtext p-component"
          style={{ width: '200px' }} 
        />
        <input 
          type="number" 
          placeholder="Buscar por precio" 
          value={filters.precio.value || ''} 
          onChange={(e) => setFilters({
            ...filters,
            precio: { ...filters.precio, value: e.target.value ? Number(e.target.value) : null }
          })}
          className="p-inputtext p-component"
          style={{ width: '200px' }} 
        />
      </div>


      <DataTable 
        value={Array.isArray(products) ? products : []} 
        paginator={false} 
        className="p-datatable-sm p-shadow-2 mt-4"
        filters={filters}
      >
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
                    onClick={() => confirmDelete(rowData.id)} 
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
