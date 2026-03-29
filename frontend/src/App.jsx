import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { TipoView } from './pages/TipoView';
import { GeneroView } from './pages/GeneroView';
import { DirectorView } from './pages/DirectorView';
import { ProductoraView } from './pages/ProductoraView';
import { MediaView } from './pages/MediaView';


function App() {
  return (
    <BrowserRouter>
      {/* El NavBar siempre se muestra porque está fuera de las Routes */}
      <NavBar />
      
      {/* Aquí cambian las pantallas mágicamente */}
      <Routes>
        <Route path="/" element={<MediaView />} />
        <Route path="/generos" element={<GeneroView />} />
        <Route path="/directores" element={<DirectorView />} />
        <Route path="/productoras" element={<ProductoraView />} />
        <Route path="/tipos" element={<TipoView />} />
        <Route path="/peliculas" element={<MediaView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;