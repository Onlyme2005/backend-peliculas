import { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../services/generoService';
import Swal from 'sweetalert2';

export const GeneroView = () => {
    const [generos, setGeneros] = useState([]);
    
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Activo');
    
    // NUEVO: Estado para saber si estamos editando
    const [idEdicion, setIdEdicion] = useState(null);

    useEffect(() => {
        cargarGeneros();
    }, []);

    const cargarGeneros = async () => {
        try {
        const data = await getGeneros();
        setGeneros(data);
        } catch (error) {
        alert('Error al cargar los géneros');
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
        const datosGenero = { nombre, descripcion, estado };
        
        if (idEdicion) {
            await updateGenero(idEdicion, datosGenero);
            // Alerta de éxito animada para actualización
            Swal.fire('¡Actualizado!', 'El género se actualizó con éxito.', 'success');
        } else {
            await createGenero(datosGenero);
            // Alerta de éxito animada para creación
            Swal.fire('¡Creado!', 'El género se creó con éxito.', 'success');
        }
        
        limpiarFormulario();
        cargarGeneros();
        } catch (error) {
        // Alerta de error animada
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response?.data?.msg || 'Hubo un error al procesar el género',
        });
        }
    };

    // NUEVO: Función para preparar la edición
    const handleEditar = (genero) => {
        setIdEdicion(genero._id);
        setNombre(genero.nombre);
        setDescripcion(genero.descripcion);
        setEstado(genero.estado);
        window.scrollTo(0, 0);
    };

    // NUEVO: Función para eliminar
const handleEliminar = async (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545', // Rojo Bootstrap
        cancelButtonColor: '#6c757d', // Gris Bootstrap
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
        try {
            await deleteGenero(id);
            Swal.fire('¡Eliminado!', 'El registro ha sido borrado.', 'success');
            cargarGeneros();
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al eliminar', 'error');
        }
        }
    });
};

    const limpiarFormulario = () => {
        setIdEdicion(null);
        setNombre('');
        setDescripcion('');
        setEstado('Activo');
    };

    return (
        <div className="container-fluid px-4 mt-4">
        <h2>Gestión de Géneros</h2>
        <hr />

        <div className={`card mb-4 shadow ${idEdicion ? 'border-warning' : ''}`}>
            <div className={`card-header text-white ${idEdicion ? 'bg-warning text-dark fw-bold' : 'bg-dark'}`}>
            {idEdicion ? '✏️ Editando Género' : '➕ Agregar Nuevo Género'}
            </div>
            <div className="card-body">
            <form onSubmit={handleGuardar}>
                <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Nombre del Género</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className={`btn ${idEdicion ? 'btn-warning' : 'btn-primary'}`}>
                    {idEdicion ? 'Actualizar Cambios' : 'Guardar Género'}
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

        <h4 className="mt-5">Catálogo de Géneros</h4>
        <div className="table-responsive">
            {/* Aplicamos align-middle, text-center y un tamaño de letra más pequeño (0.9rem) para compactar */}
            <table className="table table-striped table-hover table-bordered text-center align-middle shadow-sm" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
                <tr>
                {/* Asignamos anchos aproximados para controlar la estructura */}
                <th style={{ width: '20%' }}>Nombre</th>
                <th style={{ width: '50%' }}>Descripción</th>
                <th style={{ width: '10%' }}>Estado</th>
                <th style={{ width: '20%' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {generos.map((genero) => (
                <tr key={genero._id}>
                    <td className="fw-bold">{genero.nombre}</td>
                    
                    {/* ESTE ES EL CAMBIO CLAVE: Limitamos el ancho de la descripción 
                        y alineamos el texto a la izquierda para mejor lectura */}
                    <td className="text-start" style={{ maxWidth: '300px' }}>
                    <small>{genero.descripcion}</small>
                    </td>
                    
                    <td>
                    <span className={`badge ${genero.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {genero.estado}
                    </span>
                    </td>
                    
                    <td>
                    {/* Agrupamos los botones horizontalmente con un pequeño gap */}
                    <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => handleEditar(genero)} className="btn btn-sm btn-warning">
                        Editar
                        </button>
                        <button onClick={() => handleEliminar(genero._id)} className="btn btn-sm btn-danger">
                        Eliminar
                        </button>
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