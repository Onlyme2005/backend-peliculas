import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {
    return (
        // Agregamos la clase 'navbar-custom' que creamos en el CSS
        <nav className="navbar navbar-expand-lg navbar-custom py-3">
        <div className="container-fluid px-4">
            
            {/* LOGO DE LA APP */}
            <Link className="navbar-brand fs-3 fw-bold" to="/">
            🎬 Admin<span style={{ color: '#f8c146' }}>Pelis</span>
            </Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-3">
                <li className="nav-item">
                <NavLink className="nav-link" to="/peliculas">Películas</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/generos">Géneros</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/directores">Directores</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/productoras">Productoras</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/tipos">Tipos</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
};