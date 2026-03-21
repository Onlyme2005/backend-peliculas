import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-4">
            {/* Usamos Link en lugar de <a> para evitar que la página se recargue */}
            <Link className="navbar-brand" to="/"> Admin Películas</Link>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link" to="/generos">Géneros</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/directores">Directores</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/productoras">Productoras</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/tipos">Tipos</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/media">Películas y Series</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
};