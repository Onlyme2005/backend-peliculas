import { useState, useEffect } from 'react';
import { getMedia, createMedia, updateMedia, deleteMedia } from '../services/mediaService';
// Importamos los otros servicios para traer las listas desplegables
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';


export const MediaView = () => {
    const [medias, setMedias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    // Estados del formulario
    const [serial, setSerial] = useState('');
    const [titulo, setTitulo] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [url, setUrl] = useState('');
    const [imagen, setImagen] = useState('');
    const [anoEstreno, setAnoEstreno] = useState('');
    const [generoPrincipal, setGeneroPrincipal] = useState('');
    const [directorPrincipal, setDirectorPrincipal] = useState('');
    const [productora, setProductora] = useState('');
    const [tipo, setTipo] = useState('');

    // NUEVO: Estado para saber si estamos editando
    const [idEdicion, setIdEdicion] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
        const mediaData = await getMedia();
        setMedias(mediaData);
        
        const genData = await getGeneros();
        setGeneros(genData.filter(g => g.estado === 'Activo')); 
        const dirData = await getDirectores();
        setDirectores(dirData.filter(d => d.estado === 'Activo')); 
        const prodData = await getProductoras();
        setProductoras(prodData.filter(p => p.estado === 'Activo')); 
        const tipData = await getTipos();
        setTipos(tipData); 
        } catch (error) {
        console.error('Error al cargar los datos', error);
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        try {
        const datosMedia = { 
            serial, titulo, sinopsis, url, imagen, anoEstreno, 
            generoPrincipal, directorPrincipal, productora, tipo 
        };
        
        if (idEdicion) {
            // Si hay un ID, significa que estamos EDITANDO
            await updateMedia(idEdicion, datosMedia);
            alert('¡Producción actualizada con éxito!');
        } else {
            // Si NO hay ID, estamos CREANDO una nueva
            await createMedia(datosMedia);
            alert('¡Producción creada con éxito!');
        }
        
        limpiarFormulario();
        cargarDatos();
        } catch (error) {
        alert(error.response?.data?.msg || 'Error al procesar la producción');
        }
    };

    // Función para subir los datos de la tabla al formulario
    const handleEditar = (pelicula) => {
        setIdEdicion(pelicula._id);
        setSerial(pelicula.serial);
        setTitulo(pelicula.titulo);
        setSinopsis(pelicula.sinopsis);
        setUrl(pelicula.url);
        setImagen(pelicula.imagen);
        setAnoEstreno(pelicula.anoEstreno);
        
        // Como la base de datos devuelve objetos anidados, sacamos el _id para los selects
        setGeneroPrincipal(pelicula.generoPrincipal?._id || '');
        setDirectorPrincipal(pelicula.directorPrincipal?._id || '');
        setProductora(pelicula.productora?._id || '');
        setTipo(pelicula.tipo?._id || '');
        
        // Hacemos scroll hacia arriba para que el usuario vea el formulario
        window.scrollTo(0, 0);
    };
    const handleEliminar = async (id) => {
    // Preguntamos antes de borrar para evitar accidentes
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta película/serie? Esta acción no se puede deshacer.');
    
    if (confirmacion) {
        try {
            await deleteMedia(id);
            alert('¡Producción eliminada con éxito! ');
            cargarDatos(); // Recargamos la tabla para que desaparezca
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al eliminar la producción');
        }
        }
    };

    const limpiarFormulario = () => {
        setIdEdicion(null);
        setSerial(''); setTitulo(''); setSinopsis(''); setUrl(''); 
        setImagen(''); setAnoEstreno(''); setGeneroPrincipal(''); 
        setDirectorPrincipal(''); setProductora(''); setTipo('');
    };

    return (
        <div className="container-fluid px-4 mt-4 mb-5">
        <h2>Gestión de Películas y Series</h2>
        <hr />

        <div className={`card mb-4 shadow ${idEdicion ? 'border-warning' : ''}`}>
            <div className={`card-header text-white ${idEdicion ? 'bg-warning text-dark fw-bold' : 'bg-dark'}`}>
            {idEdicion ? ' Editando Producción' : ' Agregar Nueva Producción'}
            </div>
            <div className="card-body">
            <form onSubmit={handleGuardar}>
                {/* ... (Todo el HTML del formulario sigue exactamente igual que antes) ... */}
                <div className="row">
                <div className="col-md-3 mb-3">
                    <label className="form-label">Serial (Único)</label>
                    {/* Deshabilitamos el serial si estamos editando para evitar errores en BD */}
                    <input type="text" className="form-control" value={serial} onChange={(e) => setSerial(e.target.value)} required disabled={idEdicion !== null} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Título</label>
                    <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="col-md-3 mb-3">
                    <label className="form-label">Año de Estreno</label>
                    <input type="number" className="form-control" value={anoEstreno} onChange={(e) => setAnoEstreno(e.target.value)} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">URL (Link de la película)</label>
                    <input type="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">URL de la Imagen/Portada</label>
                    <input type="url" className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                </div>

                <div className="col-md-3 mb-3">
                    <label className="form-label">Género</label>
                    <select className="form-select" value={generoPrincipal} onChange={(e) => setGeneroPrincipal(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <label className="form-label">Director</label>
                    <select className="form-select" value={directorPrincipal} onChange={(e) => setDirectorPrincipal(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <label className="form-label">Productora</label>
                    <select className="form-select" value={productora} onChange={(e) => setProductora(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                    </select>
                </div>

                <div className="col-md-3 mb-3">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                    </select>
                </div>

                <div className="col-12 mb-3">
                    <label className="form-label">Sinopsis</label>
                    <textarea className="form-control" rows="3" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} required></textarea>
                </div>
                </div>
                
                <div className="d-flex gap-2">
                <button type="submit" className={`btn ${idEdicion ? 'btn-warning' : 'btn-primary'} w-100`}>
                    {idEdicion ? 'Actualizar Cambios ' : 'Guardar Producción ❤️'}
                </button>
                
                {/* Si estamos editando, mostramos un botón para cancelar */}
                {idEdicion && (
                    <button type="button" className="btn btn-secondary w-50" onClick={limpiarFormulario}>
                    Cancelar Edición
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>

        <h4 className="mt-5">Catálogo Completo de Producciones</h4>
        <div className="table-responsive">
            {/* Tabla expandida con estilo más pequeño para que quepa todo */}
            <table className="table table-striped table-bordered text-center align-middle" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
                <tr>
                <th>Portada</th>
                <th>Info Principal</th>
                <th>Sinopsis</th>
                <th>Detalles Extra</th>
                <th>URL</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {medias.map((pelicula) => (
                <tr key={pelicula._id}>
                    <td><img src={pelicula.imagen} alt="Portada" style={{ width: '60px', height: '85px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    
                    <td className="text-start">
                    <strong>{pelicula.titulo}</strong> ({pelicula.anoEstreno})<br/>
                    <span className="badge bg-secondary me-1">{pelicula.generoPrincipal?.nombre}</span>
                    <span className="badge bg-info text-dark">{pelicula.tipo?.nombre}</span>
                    </td>
                    
                    {/* Limitamos el ancho de la sinopsis para que no rompa la tabla */}
                    <td className="text-start" style={{ maxWidth: '250px' }}>
                    <small>{pelicula.sinopsis}</small>
                    </td>
                    
                    <td className="text-start">
                    <strong>Director:</strong> {pelicula.directorPrincipal?.nombres} <br/>
                    <strong>Productora:</strong> {pelicula.productora?.nombre} <br/>
                    </td>
                    
                    <td>
                    <a href={pelicula.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">Ver</a>
                    </td>
<td>
                    {/* Un div para agrupar ambos botones ordenadamente */}
                    <div className="d-flex flex-column gap-1">
                      
                      {/* EL BOTÓN MÁGICO DE EDITAR (Amarillo) */}
                      <button onClick={() => handleEditar(pelicula)} className="btn btn-sm btn-warning">
                            Editar
                        </button>
                        
                        {/* EL NUEVO BOTÓN DE ELIMINAR (Rojo) */}
                        <button onClick={() => handleEliminar(pelicula._id)} className="btn btn-sm btn-danger">
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