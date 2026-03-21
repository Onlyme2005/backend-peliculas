import { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../services/productoraService';

export const ProductoraView = () => {
    const [productoras, setProductoras] = useState([]);
    
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [slogan, setSlogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    const [idEdicion, setIdEdicion] = useState(null);

    useEffect(() => {
        cargarProductoras();
    }, []);

    const cargarProductoras = async () => {
        try {
        const data = await getProductoras();
        setProductoras(data);
        } catch (error) {
        alert('Error al cargar las productoras');
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
        const datosProductora = { nombre, estado, slogan, descripcion };
        
        if (idEdicion) {
            await updateProductora(idEdicion, datosProductora);
            alert('¡Productora actualizada con éxito!');
        } else {
            await createProductora(datosProductora);
            alert('¡Productora creada con éxito!');
        }
        
        limpiarFormulario();
        cargarProductoras();
        } catch (error) {
        alert(error.response?.data?.msg || 'Hubo un error al procesar la productora');
        }
    };

    const handleEditar = (productora) => {
        setIdEdicion(productora._id);
        setNombre(productora.nombre);
        setEstado(productora.estado);
        setSlogan(productora.slogan);
        setDescripcion(productora.descripcion);
        window.scrollTo(0, 0);
    };

    const handleEliminar = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar esta productora?');
        if (confirmacion) {
        try {
            await deleteProductora(id);
            alert('Productora eliminada con éxito');
            cargarProductoras();
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al eliminar');
        }
        }
    };

    const limpiarFormulario = () => {
        setIdEdicion(null);
        setNombre('');
        setEstado('Activo');
        setSlogan('');
        setDescripcion('');
    };

    return (
        <div className="container-fluid px-4 mt-4">
        <h2>Gestión de Productoras</h2>
        <hr />

        <div className={`card mb-4 shadow ${idEdicion ? 'border-warning' : ''}`}>
            <div className={`card-header text-white ${idEdicion ? 'bg-warning text-dark fw-bold' : 'bg-dark'}`}>
            {idEdicion ? '✏️ Editando Productora' : '➕ Agregar Nueva Productora'}
            </div>
            <div className="card-body">
            <form onSubmit={handleGuardar}>
                <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Nombre de la Productora</label>
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
                    <label className="form-label">Slogan</label>
                    <input type="text" className="form-control" value={slogan} onChange={(e) => setSlogan(e.target.value)} required />
                </div>

                <div className="col-12 mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" rows="2" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className={`btn ${idEdicion ? 'btn-warning' : 'btn-primary'}`}>
                    {idEdicion ? 'Actualizar Cambios' : 'Guardar Productora'}
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

        <h4 className="mt-5">Catálogo de Productoras</h4>
        <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center align-middle shadow-sm" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
                <tr>
                <th style={{ width: '20%' }}>Nombre</th>
                <th style={{ width: '25%' }}>Slogan</th>
                <th style={{ width: '25%' }}>Descripción</th>
                <th style={{ width: '10%' }}>Estado</th>
                <th style={{ width: '20%' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productoras.map((productora) => (
                <tr key={productora._id}>
                    <td className="fw-bold">{productora.nombre}</td>
                    <td className="text-start text-muted" style={{ maxWidth: '200px' }}>
                    <small><em>"{productora.slogan}"</em></small>
                    </td>
                    <td className="text-start" style={{ maxWidth: '250px' }}>
                    <small>{productora.descripcion}</small>
                    </td>
                    <td>
                    <span className={`badge ${productora.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {productora.estado}
                    </span>
                    </td>
                    <td>
                    <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => handleEditar(productora)} className="btn btn-sm btn-warning">Editar</button>
                        <button onClick={() => handleEliminar(productora._id)} className="btn btn-sm btn-danger">Eliminar</button>
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