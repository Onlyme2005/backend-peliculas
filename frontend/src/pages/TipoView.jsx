import { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../services/tipoService';

export const TipoView = () => {
    const [tipos, setTipos] = useState([]);
    
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    const [idEdicion, setIdEdicion] = useState(null);

    useEffect(() => {
        cargarTipos();
    }, []);

    const cargarTipos = async () => {
        try {
        const data = await getTipos();
        setTipos(data);
        } catch (error) {
        alert('Error al cargar los tipos');
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
        const datosTipo = { nombre, descripcion };
        
        if (idEdicion) {
            await updateTipo(idEdicion, datosTipo);
            alert('¡Tipo actualizado con éxito!');
        } else {
            await createTipo(datosTipo);
            alert('¡Tipo creado con éxito!');
        }
        
        limpiarFormulario();
        cargarTipos();
        } catch (error) {
        alert(error.response?.data?.msg || 'Hubo un error al procesar el tipo');
        }
    };

    const handleEditar = (tipo) => {
        setIdEdicion(tipo._id);
        setNombre(tipo.nombre);
        setDescripcion(tipo.descripcion);
        window.scrollTo(0, 0);
    };

    const handleEliminar = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar este tipo?');
        if (confirmacion) {
        try {
            await deleteTipo(id);
            alert('Tipo eliminado con éxito');
            cargarTipos();
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al eliminar');
        }
        }
    };

    const limpiarFormulario = () => {
        setIdEdicion(null);
        setNombre('');
        setDescripcion('');
    };

    return (
        <div className="container-fluid px-4 mt-4">
        <h2>Gestión de Tipos</h2>
        <hr />

        <div className={`card mb-4 shadow ${idEdicion ? 'border-warning' : ''}`}>
            <div className={`card-header text-white ${idEdicion ? 'bg-warning text-dark fw-bold' : 'bg-dark'}`}>
            {idEdicion ? '✏️ Editando Tipo' : '➕ Agregar Nuevo Tipo'}
            </div>
            <div className="card-body">
            <form onSubmit={handleGuardar}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre del Tipo</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className={`btn ${idEdicion ? 'btn-warning' : 'btn-primary'}`}>
                    {idEdicion ? 'Actualizar Cambios' : 'Guardar Tipo'}
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

        <h4 className="mt-5">Catálogo de Tipos</h4>
        <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center align-middle shadow-sm" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
                <tr>
                <th style={{ width: '30%' }}>Nombre</th>
                <th style={{ width: '50%' }}>Descripción</th>
                <th style={{ width: '20%' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipos.map((tipo) => (
                <tr key={tipo._id}>
                    <td className="fw-bold">{tipo.nombre}</td>
                    <td className="text-start" style={{ maxWidth: '300px' }}>
                    <small>{tipo.descripcion}</small>
                    </td>
                    <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => handleEditar(tipo)} className="btn btn-sm btn-warning">Editar</button>
                        <button onClick={() => handleEliminar(tipo._id)} className="btn btn-sm btn-danger">Eliminar</button>
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