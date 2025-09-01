import { useUserContext } from '../../context/UserContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';   
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { FilterMatchMode } from 'primereact/api';
import { AuthContext } from "../../context/AuthContext";

export default function UsersView() {
  const { users, deleteUser, loading, error } = useUserContext();
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.CONTAINS }
  
  });

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'email', 'edad', 'role']);
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: '¿Seguro que deseas eliminar este usuario?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => deleteUser(id)
    });
  };

  return (
    <div>
      <Navbar />
      <h2>👤 Lista de Usuarios 👤</h2>
      
      {user?.role === "admin" && (
        <Link to="/usuarios/crear">
          <Button 
            label="Crear nuevo usuario" 
            icon="pi pi-plus" 
            className="p-button-rounded p-button-success mr-2" 
          />
        </Link>
      )}
      
      <Button 
        label="Exportar PDF" 
        icon="pi pi-file-pdf" 
        className="p-button-rounded p-button-warning" 
        onClick={handleExport} 
      />

      {loading && <p>Cargando usuarios...</p>}
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
          type="text" 
          placeholder="Buscar por email" 
          value={filters.email.value || ''} 
          onChange={(e) => setFilters({
            ...filters,
            email: { ...filters.email, value: e.target.value }
          })}
          className="p-inputtext p-component"
          style={{ width: '200px' }} 
        />
        <input 
          type="text" 
          placeholder="Buscar por Rol" 
          value={filters.role.value || ''} 
          onChange={(e) => setFilters({
            ...filters,
            role: { ...filters.role, value: e.target.value }
          })}
          className="p-inputtext p-component"
          style={{ width: '200px' }} 
        />
      </div>

      <DataTable 
        value={Array.isArray(users) ? users : []} 
        paginator={false} 
        className="p-datatable-sm p-shadow-2 mt-4"
        filters={filters}
      >
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="edad" header="Edad" />
        <Column field="role" header="Rol" />

        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              {user?.role === "admin" && (
                <>
                  <Link to={`/usuarios/editar/${rowData.id}`}>
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
