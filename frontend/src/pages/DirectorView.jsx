import { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';

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
            alert('¡Director actualizado con éxito!');
        } else {
            await createDirector(datosDirector);
            alert('¡Director creado con éxito!');
        }
        
        limpiarFormulario();
        cargarDirectores();
        } catch (error) {
        alert(error.response?.data?.msg || 'Hubo un error al procesar el director');
        }
    };

    const handleEditar = (director) => {
        setIdEdicion(director._id);
        setNombres(director.nombres);
        setEstado(director.estado);
        window.scrollTo(0, 0);
    };

    const handleEliminar = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar este director?');
        if (confirmacion) {
        try {
            await deleteDirector(id);
            alert('Director eliminado con éxito');
            cargarDirectores();
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al eliminar');
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
            <table className="table table-striped table-bordered text-center align-middle shadow-sm" style={{ fontSize: '0.9rem' }}>
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