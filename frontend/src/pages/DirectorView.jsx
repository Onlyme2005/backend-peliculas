import { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';
import Swal from 'sweetalert2';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
    
    const [nombres, setNombres] = useState('');
    const [estado, setEstado] = useState('Activo');
    
    const [idEdicion, setIdEdicion] = useState(null);

    useEffect(() => {
        cargarDirectores();
    }, []);

    const cargarDirectores = async () => {
        try {
        const data = await getDirectores();
        setDirectores(data);
        } catch (error) {
        alert('Error al cargar los directores');
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
        const datosDirector = { nombres, estado };
        
        if (idEdicion) {
            await updateDirector(idEdicion, datosDirector);
            // Alerta de éxito animada para actualización
            Swal.fire('¡Actualizado!', 'El director se actualizó con éxito.', 'success');
        } else {
            await createDirector(datosDirector);
            // Alerta de éxito animada para creación
            Swal.fire('¡Creado!', 'El director se creó con éxito.', 'success');
        }
        
        limpiarFormulario();
        cargarDirectores();
        } catch (error) {
        // Alerta de error animada
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response?.data?.msg || 'Hubo un error al procesar el director',
        });
        }
    };
    const handleEditar = (director) => {
        setIdEdicion(director._id);
        setNombres(director.nombres);
        setEstado(director.estado);
        window.scrollTo(0, 0);
    };

    const handleEliminar = async (id) => {
        // 1. Lanzamos el cuadro de confirmación
        const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545', // Color rojo (danger)
        cancelButtonColor: '#6c757d', // Color gris (secondary)
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
        });

        // 2. Verificamos si el usuario hizo clic en "Sí, eliminar"
        if (result.isConfirmed) {
        try {
            await deleteDirector(id);
            // 3. Mostramos mensaje de éxito
            Swal.fire(
            '¡Eliminado!',
            'El director ha sido borrado correctamente.',
            'success'
            );
            cargarDirectores();
        } catch (error) {
            // 4. Si algo falla en el backend
            Swal.fire(
            'Error',
            error.response?.data?.msg || 'Error al eliminar el registro',
            'error'
            );
        }
        }
    };

    const limpiarFormulario = () => {
        setIdEdicion(null);
        setNombres('');
        setEstado('Activo');
    };

    return (
        <div className="container-fluid px-4 mt-4">
        <h2>Gestión de Directores</h2>
        <hr />

        <div className={`card mb-4 shadow ${idEdicion ? 'border-warning' : ''}`}>
            <div className={`card-header text-white ${idEdicion ? 'bg-warning text-dark fw-bold' : 'bg-dark'}`}>
            {idEdicion ? '✏️ Editando Director' : '➕ Agregar Nuevo Director'}
            </div>
            <div className="card-body">
            <form onSubmit={handleGuardar}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre del Director</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className={`btn ${idEdicion ? 'btn-warning' : 'btn-primary'}`}>
                    {idEdicion ? 'Actualizar Cambios' : 'Guardar Director'}
                </button>
                {idEdicion && (
                    <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                    Cancelar
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>

        <h4 className="mt-5">Catálogo de Directores</h4>
        <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center align-middle shadow-sm" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
                <tr>
                <th style={{ width: '40%' }}>Nombre del Director</th>
                <th style={{ width: '20%' }}>Estado</th>
                <th style={{ width: '40%' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {directores.map((director) => (
                <tr key={director._id}>
                    <td className="fw-bold">{director.nombres}</td>
                    <td>
                    <span className={`badge ${director.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {director.estado}
                    </span>
                    </td>
                    <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => handleEditar(director)} className="btn btn-sm btn-warning">Editar</button>
                        <button onClick={() => handleEliminar(director._id)} className="btn btn-sm btn-danger">Eliminar</button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};