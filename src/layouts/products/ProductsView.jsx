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
import { InputText } from 'primereact/inputtext';
import { ProtectedButton } from '../../components/ProtectedButton';

export default function ProductsView() {
  const { products, deleteProduct, loading, error, lazy, setLazy, total } = useProductContext();
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
        <Link to="/productos/crear">
          <ProtectedButton allowedRoles={"admin"} label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>
      <Button label="Exportar PDF" icon="pi pi-file-pdf" className="p-button-rounded p-button-warning" onClick={handleExport} />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ConfirmDialog />
      
      <span>Buscar: </span>
      <InputText
      value= {lazy?.q}
      onChange={(e)=> setLazy({...lazy, q: e.target.value, first:0, page:0})}
      placeholder='nombre del producto'/>

      <DataTable 
        value={Array.isArray(products) ? products : []} 
        paginator
        className="p-datatable-sm p-shadow-2 mt-4"
        lazy
        totalRecords={total}
        first={lazy.first}
        rows={lazy.rows}
        onPage={(e) => setLazy(e)} //e = {first, rows, page} 
        emptyMessage={lazy.q ? 'Sin resultados' : 'no hay productos registrados'}
      >
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" />
        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
                <>
                  <Link to={`/productos/editar/${rowData.id}`}>
                    <ProtectedButton allowedRoles={"admin"}
                      label="Editar" 
                      icon="pi pi-pencil" 
                      className="p-button-rounded p-button-info mr-2" 
                    />
                  </Link>
                  <ProtectedButton allowedRoles={"admin"}
                    label="Eliminar" 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger" 
                    onClick={() => confirmDelete(rowData.id)} 
                  />
                </>
            </>
          )}
        />
      </DataTable>
    </div>
  );
}
